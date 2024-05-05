import redis
import redis_om
from Models import User, Booking, Host
from pydantic import ValidationError
from redis_om import Migrator
from datetime import datetime,timedelta,timezone
import csv

r = redis.Redis(host = 'localhost', port = 6379, decode_responses = True, db=0)

# data partially filled from the following apartment complexes:
# The Grad
# The Julian
# Miro Apartments

def insert_dummy_users():
    with open(r'hosthub\backend\sample_users.csv', newline='') as csvfile:
        data = list(csv.reader(csvfile))

    # ['username', 'firstName', 'lastName', 'email', 'addressNumber', 'city',
    # 'country', 'state', 'zip', 'phoneNumber', 'desc', 'password', 'profilePhoto', 'gender']

    data.remove(data[0]) # remove heading
    #Migrator.run()

    for d in data:
        print(d[0])

    print("Dummy User Data Generated!")

              
def insert_dummy_hostings():
    return

if __name__ == "__main__":
    insert_dummy_users()