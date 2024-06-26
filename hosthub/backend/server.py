
from flask import Flask, jsonify, request, redirect, url_for,send_from_directory,current_app
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import redis
import redis_om
from Models import User, Booking, Host
from pydantic import ValidationError
from redis_om import Migrator
from flask_jwt_extended import create_access_token, get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import current_user
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt
from werkzeug.exceptions import HTTPException
import os
from datetime import datetime,timedelta,timezone
from werkzeug.utils import secure_filename
import requests
import json
import csv

# from redis.cluster import RedisCluster

r = redis.Redis(host = 'localhost', port = 6379, decode_responses = True, db=0)
# r = redis.Redis(host='redis-13404.c14.us-east-1-2.ec2.cloud.redislabs.com', 
            # port=13404, db=0, password="n3pRbBl2Y9oMdJ7J36QTPHzJBPPSAaQQ")
# rc = RedisCluster(host='localhost', port=16379)


# ############ create Flask app
app = Flask(__name__,static_url_path=None)
app.config.from_object(__name__)
app.app_context()
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_SECRET_KEY"] = "mySecret"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)


# orginalPath = app.instance_path[0:-8]
rootPath = app.root_path
pathName = rootPath + '/uploads'
UPLOAD_FOLDER = pathName
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# print(pathName)
app.config['STATIC_FOLDER'] = 'uploads'
######### enable Cors
# CORS(app, resources ={r'/*':{'origins': 'http://localhost:5173'},'supports_credentials': True})
CORS(app, origins = ['http://localhost:5173'], supports_credentials = True )

Migrator().run()

# Api route
@app.route("/",methods = ["GET"])
def members():
    # re = []
    # for key in r.scan_iter('available_*'):
    #     for i in r.smembers(key):
    #         if "2024-05-01,2024-05-15" in i:
    #             re.append(key)
    # return re
    re = []
    for key in r.scan_iter('available_*'):
        for i in r.smembers(key):
            if "2024-05-01,2024-05-15" in i:
                re.append(key[10:])  
                break
    return re

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    print(e)
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


# register a user account
# user history will be a separate redis LIST in format history_{user_id}
@app.route("/register",methods = ["POST"])
def register():
    input =  request.get_json()
    if not input:
        return "Bad Request", 400

    # Check for pre-existing account here
    userData = User.User.find(User.User.username == input["username"])
    if len(list(userData)) != 0:
        return ("Username already exists", 404)

    pw_hash = bcrypt.generate_password_hash(input["password"],5).decode('utf-8')
    try: 
        print(input["username"])
        person = User.User(
            username = input["username"],
            firstName =  input["firstName"],
            lastName = input["lastName"],
            email = input["email"],
            password = pw_hash
        )
        person.save()
        return {"user_id": person.pk}
    except ValidationError as e:
       return json.dumps(str(e)), 401

# log into user account
@app.route("/login",methods = ["POST"])
def login():
    input =  request.get_json()
    userData = User.User.find(User.User.username == input["username"])

    if len(list(userData)) != 0:
        user = userData[0]
        hostData = Host.Host.find(Host.Host.owner == user.pk)
        checkPassword = bcrypt.check_password_hash(user.password, input["password"])

        if not checkPassword:
            return "wrong password"
        else:
            if (len(list(hostData)) == 0):
                response = jsonify({"username":user.username,
                                    "firstName": user.firstName,"lastName": user.lastName,
                                     "id":user.pk,"email":user.email, 
                                     "profilePhoto": user.profilePhoto, "desc": user.desc,
                                     "history":r.execute_command(f"lrange history_{user.pk} 0 -1")})
            else:
                response = jsonify({"username":user.username,"firstName": user.firstName,
                                    "lastName": user.lastName, "id":user.pk,"hostId": user.pk,
                                    "email":user.email, "profilePhoto": user.profilePhoto, "desc": user.desc,
                                    "history":r.execute_command(f"lrange history_{user.pk} 0 -1")})
            access_token = create_access_token(identity=user.pk)
            set_access_cookies(response,access_token)
            return response
    else: 
        return "user not found"


@app.route("/checkTokenExpiry",methods = ["GET"])
@jwt_required()
def chec_token_expiry():
    return str(get_jwt()["exp"])

# log out of user account
@app.route("/logout", methods = ["POST"] )
def logout():
    response = jsonify({'logout': True})
    unset_jwt_cookies(response)
    return response

# view profile details
@app.route("/profile",methods = ["GET"])
@jwt_required()
def profile():
    token = request.cookies
    if len(list(token)) == 0:
        return "no user"
    else:
        # Getting user
        verify = verify_jwt_in_request()
        current_user = get_jwt_identity()

        #Getting booking history
        re = r.execute_command(f'lrange history_{current_user} 0 -1')
        booking_list = []
        for i in re:
            bookings = Booking.Booking.find(Booking.Booking.pk == i)
            booking_info = {"hostId": bookings[0].host, "date": bookings[0].date}
            booking_list.append(booking_info)

        # Getting user and host information 
        userData = User.User.find(User.User.pk == current_user)
        user = userData[0]
        hostData = Host.Host.find(Host.Host.owner == current_user)
        Migrator().run()    

        if (len(list(hostData)) == 0):
            return  {"username":user.username,"firstName": user.firstName,
                        "lastName": user.lastName, "id":user.pk, 
                        "email":user.email, "profilePhoto": user.profilePhoto,
                        "desc": user.desc,"gender": user.gender,"status": user.status,
                        "addressNumber": user.addressNumber, "city": user.city, "country": user.country,
                        "state":user.state, "zip":user.zip, "phoneNumber":user.phoneNumber,
                        "bookingHistory": booking_list}
        else:
            return  {"username":user.username,"firstName": user.firstName,
                    "lastName": user.lastName, "id":user.pk,"hostId":hostData[0].pk,
                    "email":user.email, "profilePhoto": user.profilePhoto, 
                    "desc": user.desc,"gender": user.gender,"status": user.status,
                     "addressNumber": user.addressNumber, "city": user.city, "country": user.country,
                        "state":user.state, "zip":user.zip, "phoneNumber":user.phoneNumber,
                        "bookingHistory": booking_list}


    
# update profile details
@app.route("/updateProfile", methods = ["PUT"])
def update_profile():
    input = request.get_json()
    userData = User.User.find( User.User.pk == input["id"])
    Migrator().run()   
    try: 
        person = User.User(
            pk = userData[0].pk,
            username = userData[0].username,
            firstName =  input["firstName"],
            lastName = input["lastName"],
            email = input["email"],
            profilePhoto = input["uploadedPhoto"],
            desc = input["desc"],
            password = userData[0].password,
            gender = input["gender"],
            status = input["status"],
            addressNumber = input["addressNumber"],
            city = input["city"],
            state = input["state"],
            country = input["country"],
            phoneNumber = input["phoneNumber"],
        )
        person.save()
        return {"user_id": person.pk}
    except ValidationError as e:
        print(e)

# create new hosting
@app.route("/host",methods = ["POST"])
def hosting():
    input = request.get_json()
    try: 
        host = Host.Host(
            owner = input["id"],
            title = input["title"],
            desc = input["desc"],
            address = input["address"],
            city =  input["city"],
            state =  input["state"],
            zip = input["zip"],
            uploadedPhotos = input["uploadedPhotos"],
            perks = input["perks"],
        )
        host.save()
        available = input['available']

        hostId = host.pk

        for str in available:
            r.execute_command(f'sadd available_{hostId} {str}')

        return {"host_id": host.pk}

    except ValidationError as e:
        print(e)

# update hosting details
@app.route("/host",methods = ["PUT"])
def hosting_update():   
    input = request.get_json()
    hostInfo = Host.Host.find(Host.Host.owner == input["id"])
    Migrator().run()   
    hostInfo = list(hostInfo)[0]
    hostId = hostInfo.pk
    try: 
        host = Host.Host(
            pk = hostId,
            owner = input["id"],
            title = input["title"],
            desc = input["desc"],
            address = input["address"],
            city =  input["city"],
            state =  input["state"],
            zip = input["zip"],
            uploadedPhotos = input["uploadedPhotos"],
            perks = input["perks"],
        )
        host.save()
        # take input of availabilities and add to available_{host_id} set
        available = input['available']
        
        #clear availabilities
        r.execute_command(f'del available_{hostId}')

        for str in available:
            r.execute_command(f'sadd available_{hostId} {str}')
        return {"host_id": host.pk}

    except ValidationError as e:
            print(e)

# see all hostings
@app.route('/fetch_allHost', methods = ["GET"])
def fetch_allHost():
    hosts = Host.Host.find().all()
    host_list = []
    for i in hosts:
        host_list.append(dict(i))
    return host_list

# see all hostings with input
@app.route('/fetch_allHost', methods = ["POST"])
def fetch_allHost_input():
    input = request.get_json()
    inputHost = input["hostList"]
    host_list = []
    # hostData = Host.Host.find(Host.Host.pk == inputHost[5]) 
    for i in inputHost:
        hostData = Host.Host.find(Host.Host.pk == i) 
        host = {"id": hostData[0].pk,"desc": hostData[0].desc, "address":hostData[0].address,
                    "city": hostData[0].city,"state":hostData[0].state, "zip":hostData[0].zip, 
                    "uploadedPhotos": hostData[0].uploadedPhotos, 
                    'title':hostData[0].title, 'perks': hostData[0].perks, 
                    "date":r.execute_command(f"smembers available_{hostData[0].pk}")}
        host_list.append(host)
    return host_list

# see hosting info
@app.route('/hostingInfo', methods = ["GET"])
def get_hosting_info():
    try:
        verify = verify_jwt_in_request()
        current_user = get_jwt_identity()
        hostData = Host.Host.find(Host.Host.owner == current_user) 
        hostId = hostData[0].pk

        return {"id": hostData[0].pk,"desc": hostData[0].desc, "address":hostData[0].address,
                "city": hostData[0].city,"state":hostData[0].state, "zip":hostData[0].zip, 
                    "uploadedPhotos": hostData[0].uploadedPhotos, 
                    'title':hostData[0].title, 'perks': hostData[0].perks, 
                    "date":r.execute_command(f"smembers available_{hostId}")}

    except ValidationError as e:
        return json.dumps(str(e)), 401

@app.route('/hostingInfo', methods = ["POST"])
def individual_host_info():
    input = request.get_json()
    hostData = Host.Host.find(Host.Host.pk == input["id"]) 
    hostId = hostData[0].pk
    return {"id": hostData[0].pk,"desc": hostData[0].desc, "address":hostData[0].address,
               "city": hostData[0].city,"state":hostData[0].state, "zip":hostData[0].zip, 
                "uploadedPhotos": hostData[0].uploadedPhotos, 
                'title':hostData[0].title, 'perks': hostData[0].perks,
                "date":r.execute_command(f"smembers available_{hostId}")}

@app.route('/ownerInfo', methods = ["POST"])
def ownerInfo():
    input = request.get_json()
    host = Host.Host.find(Host.Host.pk == input["id"]) 
    return host[0].owner

# add a potential booking to user cart
@app.route('/addToCart', methods = ["POST"])
def add_cart():
    input = request.get_json()
    host_id = input["id"]
    user = input["user"]
    date = input["date"]
    
    hostData = Host.Host.find(Host.Host.owner == user) 

    if len(list(hostData)) != 0 and hostData[0].pk == host_id:
        return "Failed"
    else:
        r.execute_command(f'hset cart_{user} host_id {host_id} date {date}')
        return {"cart": 'cart_'+user}

# get cart for checking out
@app.route('/getCart', methods = ["POST"])
def get_cart():
    input = request.get_json()
    cart_id = input["cart_id"]
    
    cart_info = r.execute_command(f'hgetall {cart_id}')
    hostData = Host.Host.find(Host.Host.pk == cart_info[1]) 
    owner = User.User.find(User.User.pk == hostData[0].owner) 
    return {"address":hostData[0].address,
            "city": hostData[0].city,"state":hostData[0].state, "zip":hostData[0].zip,
            "owner_firstName": owner[0].firstName,
            "owner_lastName": owner[0].lastName, "date": cart_info[3], "hostId": hostData[0].pk}

# getting booking
@app.route('/getBookingHistory', methods=["POST"])
def bookingHistory():
    input = request.get_json() 
    host = input["booking"]
    hostList = []
    for i in host:
        hostData= Host.Host.find(Host.Host.pk == i["hostId"]) 
        booking_info = {"title":hostData[0].title ,"desc" :hostData[0].desc,
         "photo":hostData[0].uploadedPhotos[0], "date": i["date"]}
        hostList.append(booking_info)
    return {"hostList": hostList}

# execute booking
@app.route('/book', methods = ["POST"])
def make_booking():
    input = request.get_json()
    user = input["user"]
    # check for cart hash by user id
    cart_status = r.execute_command(f"EXISTS cart_{user}")
    if cart_status == 1:
        try:
            host_id = r.execute_command(f'hget cart_{user} host_id')
            date = r.execute_command(f'hget cart_{user} date')
            # create booking
            booking = Booking.Booking(
                user = user,
                host = host_id,
                date = date
            )
            booking.save()
            # add booking to history for user and host
            try: 
                r.execute_command(f'lpush history_{user} {booking.pk}')
                r.execute_command(f'lpush history_{host_id} {booking.pk}')
                # remove from availabilities on booking
                r.execute_command(f'srem available_{host_id} {date}')
                # delete cart
                r.execute_command(f"del cart_{user}")

                return {"booking_id": booking.pk}
            except Exception as e:
                print(e)
        except Exception as e:
            print(e)
    else:
        return ("Booking failed")

@app.route('/searchingDate', methods = ["POST"])
def searching():
    input = request.get_json()
    re = []
    for key in r.scan_iter('available_*'):
        for i in r.smembers(key):
            if f'{input["date"]}' in i:
                re.append(key[10:])   
                break
    return re

@app.route('/uploads/<path:filename>', methods = ["GET"])
def photoDisplay(filename):
    return send_from_directory(app.config.get('STATIC_FOLDER'), filename)

@app.route("/upload-by-link",methods = ["POST"])
def upload_file_url():
    input =  request.get_json()
    image_url = input['link']
    data = requests.get(image_url).content
    now = datetime.now()
    timestamp = str(round(datetime.timestamp(now)))
    filename = timestamp + '.jpg'
    f = open(pathName+'/'+filename,'wb')
    f.write(data)
    f.close()
    return filename


@app.route('/upload', methods = ["POST"])
def upload_file():
    file = request.files['file']
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    return file.filename

###########################
### DUMMY DATA CREATION ###
###########################

def insert_dummy_users():
    with open(r'sample_users_final.csv', newline='') as csvfile:
        data = list(csv.reader(csvfile))

    # ['username', 'firstName', 'lastName', 'email', 'addressNumber', 'city',
    # 'country', 'state', 'zip', 'phoneNumber', 'desc', 'password', 'profilePhoto', 'gender']

    data.remove(data[0]) # remove heading

    for d in data:

        pw_hash = bcrypt.generate_password_hash(d[11],5).decode('utf-8')
        person = User.User(
            username = d[0],
            firstName =  d[1],
            lastName = d[2],
            email =  d[3],
            password = pw_hash,
            addressNumber = d[4],
            city = d[5],
            country = d[6],
            state = d[7],
            zip = d[8],
            phoneNumber = d[9],
            desc = d[10],
            profilePhoto = d[12],
            gender = d[13]
        )
        person.save()

    print("Dummy User Data Generated!")

def insert_dummy_hosts():
    with open(r'sample_hosts_final.csv', newline='') as csvfile:
        data = list(csv.reader(csvfile))

    # owner	 title	desc	address 	city	state	zip	 uploadedPhotos	 perks availabilities

    data.remove(data[0]) # remove heading

    for d in data:
        host_owner = User.User.find(User.User.username == d[0]) 
        owner_id = host_owner[0].pk

        available = d[9].split(" + ")

        host = Host.Host(
            owner = owner_id,
            title = d[1],
            desc = d[2],
            address = d[3],
            city = d[4],
            state = d[5],
            zip = d[6],
            uploadedPhotos = [d[7]],
            perks = d[8].split("+")
        )
        host.save()
        hostId = host.pk

        for str in available:
            r.execute_command(f'sadd available_{hostId} {str}')

    print("Dummy Host Data Generated!")

if __name__ == "__main__":

    eilic = User.User.find(User.User.username == "eilic") 
    if len(list(eilic)) == 0:
        insert_dummy_users()
        insert_dummy_hosts()

    app.run(debug=True, port = 5000, host = "localhost")
    
