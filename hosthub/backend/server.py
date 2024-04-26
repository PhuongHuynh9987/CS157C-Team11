from flask_cors import CORS
from flask_bcrypt import Bcrypt
import redis
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
import os
from datetime import datetime,timedelta,timezone
from werkzeug.utils import secure_filename
import requests
from flask import Flask, current_app, jsonify, request, send_from_directory
import json

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
# print(app.config.get('STATIC_FOLDER'))
######### enable Cors
# CORS(app, resources ={r'/*':{'origins': 'http://localhost:5173'},'supports_credentials': True})
CORS(app, origins = ['http://localhost:5173'],supports_credentials = True )

# Api route
@app.route("/",methods = ["GET"])
def members():
    return 'localhost:5000'+pathName+'1711999951.jpg'

# register a user account
# user history will be a separate redis LIST in format history_{user_id}
@app.route("/register",methods = ["POST"])
def register():
    input =  request.get_json()
    print(input["username"])
    if not input:
        return "Bad Request", 400

    # Check for pre-existing account here
    #userData = User.User.find(User.User.username == input["username"]).all()
    #print(userData)
    # if (userData):
    #    return ("Username already exists", 404)

    pw_hash = bcrypt.generate_password_hash(input["password"],5).decode('utf-8')
    try: 
        person = User.User(
            username = input["username"],
            firstName =  input["firstName"],
            lastName = input["lastName"],
            email = input["email"],
            password = pw_hash,
        )
        person.save()
        return {"user_id": person.pk}
    except ValidationError as e:
        print(e)

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
                response = jsonify({"username":userData[0].username,
                                    "firstName": userData[0].firstName,"lastName": userData[0].lastName,
                                     "id":userData[0].pk,"email":userData[0].email, 
                                     "profilePhoto": userData[0].profilePhoto, "desc": userData[0].desc,
                                     "history":r.execute_command(f"lrange history_{user.pk} 0 -1")})
            else:
                response = jsonify({"username":userData[0].username,"firstName": userData[0].firstName,
                                    "lastName": userData[0].lastName, "id":userData[0].pk,"hostId":hostData[0].pk,
                                    "email":userData[0].email, "profilePhoto": userData[0].profilePhoto, "desc": userData[0].desc,
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
        verify = verify_jwt_in_request()
        current_user = get_jwt_identity()
        userData = User.User.find(User.User.pk == current_user)
        hostData = Host.Host.find(Host.Host.owner == current_user)
        Migrator().run()    
        if (len(list(hostData)) == 0):
            return  {"username":userData[0].username,"firstName": userData[0].firstName,
                        "lastName": userData[0].lastName, "id":userData[0].pk, 
                        "email":userData[0].email, "profilePhoto": userData[0].profilePhoto,
                        "desc": userData[0].desc,"gender": userData[0].gender,"status": userData[0].status}
        else:
            return  {"username":userData[0].username,"firstName": userData[0].firstName,
                    "lastName": userData[0].lastName, "id":userData[0].pk,"hostId":hostData[0].pk,
                    "email":userData[0].email, "profilePhoto": userData[0].profilePhoto, 
                    "desc": userData[0].desc,"gender": userData[0].gender,"status": userData[0].status}

# update profile details
@app.route("/updateProfile", methods = ["PUT"])
def update_profile():
    input = request.get_json()
    hostData = User.User.find( User.User.pk == input["id"])
    Migrator().run()   
    try: 
        person = User.User(
            pk = hostData[0].pk,
            username = hostData[0].username,
            firstName =  input["firstName"],
            lastName = input["lastName"],
            email = input["email"],
            profilePhoto = input["uploadedPhoto"],
            desc = input["desc"],
            password = hostData[0].password,
            gender = input["gender"],
            status = input["status"]
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
        return {"host_id": host.pk}
        
    except ValidationError as e:
            print(e)

# add availabilities
#@app.route("/addAvailability", methods = ["PUT"])
#def add_availability():
    # input = request.get_

    # # take input of availabilities and add to available_{host_id} set
    # available = input['available']

    # for str in available:
    #     r.execute_command(f'sadd available_{hostId} "{str}"')
    # return {"host_id": host.pk}


# see all hostings
@app.route('/fetch_allHost', methods = ["GET"])
def fetch_allHost():
    hosts = Host.Host.find().all()
    host_list = []
    for i in hosts:
        host_list.append(dict(i))
    return host_list

# see hosting info
@app.route('/hostingInfo', methods = ["GET"])
def get_hosting_info():
    verify = verify_jwt_in_request()
    current_user = get_jwt_identity()
    hostData = Host.Host.find(Host.Host.owner == current_user) 
    return {"id": hostData[0].pk,"desc": hostData[0].desc, "address":hostData[0].address,
               "city": hostData[0].city,"state":hostData[0].state, "zip":hostData[0].zip, 
                "uploadedPhotos": hostData[0].uploadedPhotos, 
                'title':hostData[0].title, 'perks': hostData[0].perks, "available":r.execute_command(f"smembers available_{hostData[0].pk}")}


@app.route('/hostingInfo', methods = ["POST"])
def individual_host_info():
    input = request.get_json()
    hostData = Host.Host.find(Host.Host.pk == input["id"]) 
    return {"id": hostData[0].pk,"desc": hostData[0].desc, "address":hostData[0].address,
               "city": hostData[0].city,"state":hostData[0].state, "zip":hostData[0].zip, 
                "uploadedPhotos": hostData[0].uploadedPhotos, 
                'title':hostData[0].title, 'perks': hostData[0].perks, "available":r.execute_command(f"smembers available_{hostData[0].pk}")}

# cart preview
@app.route("/showCart", methods = ["GET"])
def show_cart():
    current_user = get_jwt_identity()

    host_id = r.execute_command(f"hget cart_{current_user} host_id")
    hostData = Host.Host.find(Host.Host.pk == input["id"]) 

    return {"title":hostData[0].title}

# add a potential booking to user cart
@app.route('/addToCart', methods = ["POST"])
def add_cart():
    current_user = get_jwt_identity()

    # check if item is in cart hash
    cart_full = r.execute_command(f"hget cart_{current_user} host_id")

    # take host id and available time slot
    input = request.get_json()

    # if item in cart don't overwrite
    if isinstance(cart_full, int):
        return ("Cart already occupied.")
    else:
        host_id = input["host_id"]
        available = input["available"]
        r.execute_command(f'hmset cart_{current_user} host_id "{host_id}" available "{available}"')

# empty the user's cart
@app.route("/clearCart", methods = ["POST"])
def clear_cart():
    current_user = get_jwt_identity()
    r.execute_command(f"del cart_{current_user}")
    return("Cart emptied.")

# execute booking
@app.route('/book', methods = ["POST"])
def make_booking():
    current_user = get_jwt_identity()
    # check for cart hash by user id
    cart_status = r.execute_command(f"EXISTS cart_{current_user}")

    if cart_status:
        try:
            host_id = r.execute_command(f'hget cart_{current_user} host_id')
            date = r.execute_command(f'hget cart_{current_user} available')

            # create booking
            booking = Booking.Booking(
                user = current_user,
                host = host_id,
                available = date
            )
            booking.save()

            # add booking to history for user and host owner
            host = Host.Host.find(Host.Host.pk == host_id) 
            owner_id = host[0].owner

            try: 
                r.execute_command(f'lpush history_{current_user} "{booking.pk}"')
                r.execute_command(f'lpush history_{owner_id} "{booking.pk}"')
               
                # remove from availabilities on booking
                r.execute_command(f'srem available_{host_id} "{date}"')

                # delete cart
                r.execute_command(f'del cart_{current_user}')
                return("Booking complete")
            except Exception as e:
                print(e)

        except Exception as e:
            print(e)
    return ("Booking failed")

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

if __name__ == "__main__":
    app.run(debug=True, port = 5000, host = "localhost")
