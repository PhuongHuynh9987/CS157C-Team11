from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import redis
from Models import User
from Models import Host
from pydantic import ValidationError
from redis_om import Migrator
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import current_user
from flask_jwt_extended import get_jwt_identity
# from redis.cluster import RedisCluster

import json

r = redis.Redis(host = 'localhost', port = 6379, decode_responses = True, db=0)
# r = redis.Redis(host='redis-13404.c14.us-east-1-2.ec2.cloud.redislabs.com', 
            # port=13404, db=0, password="n3pRbBl2Y9oMdJ7J36QTPHzJBPPSAaQQ")

# rc = RedisCluster(host='localhost', port=16379)

# ############ create Flask app
app = Flask(__name__)
app.config.from_object(__name__)
app.app_context()
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_SECRET_KEY"] = "mySecret"


######### enable Cors
# CORS(app, resources ={r'/*':{'origins': 'http://localhost:5173'},'supports_credentials': True})
CORS(app, origins = ['http://localhost:5173'],supports_credentials = True )


# Api route
@app.route("/",methods = ["GET"])
def members():
    Migrator().run()
    emptyornot = User.User.find(User.User.username == 'adam')[0]
    if not emptyornot:
        return "empty"
    return {"type": list(emptyornot)[3][1]}


@app.route("/register",methods = ["POST"])
def register():
    input =  request.get_json()
    pw_hash = bcrypt.generate_password_hash(input["password"],5).decode('utf-8')
    try: 
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
        print(e)

@app.route("/login",methods = ["POST"])
def login():
    input =  request.get_json()
    userData = User.User.find(User.User.username == input["username"])

    if len(list(userData)) != 0:
        user = userData[0]
        checkPassword = bcrypt.check_password_hash(user.password, input["password"])
        if not checkPassword:
            return "wrong password"
        else:
            response = jsonify([user.firstName,user.pk])
            access_token = create_access_token(identity=user.pk)
            set_access_cookies(response,access_token)
            return response
    else: 
        return "user not found"

@app.route("/logout", methods = ["POST"] )
def logout():
    response = jsonify({'logout': True})
    unset_jwt_cookies(response)
    return response

@app.route("/profile",methods = ["GET"])
@jwt_required()
def profile():
    token = request.cookies["access_token_cookie"]
    if (token):
        verify = verify_jwt_in_request()
        current_user = get_jwt_identity()
        userData = User.User.find(User.User.pk == current_user)
        hostData = Host.Host.find(Host.Host.owner == current_user)
        Migrator().run()    
        if(len(list(hostData)) == 0):
            return  {"firstName": userData[0].firstName, "id":userData[0].pk}
        else:
            return  {"firstName": userData[0].firstName, "id":userData[0].pk,"hostId":hostData[0].pk}
    else:
        return "empty"

@app.route("/host",methods = ["POST"])
def hosting():
    input =  request.get_json()
    try: 
        host = Host.Host(
            owner = input["id"],
            title = input["title"],
            desc = input["desc"],
            addressNumber = input["addressNumber"],
            addressStreet =  input["addressStreet"],
            cityStateZip = input["cityStateZip"],
        )
        host.save()
        return {"host_id": host.pk}

    except ValidationError as e:
        print(e)



if __name__ == "__main__":
    app.run(debug=True, port = 5000, host = "localhost")



