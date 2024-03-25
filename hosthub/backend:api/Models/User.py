from redis_om import (Field, JsonModel,Migrator, HashModel)
from pydantic import ValidationError
import redis

r = redis.Redis(host = 'localhost', port = 6379, decode_responses = True, db=0)

class User(JsonModel):
    username: str = Field(index=True)
    firstName: str 
    lastName: str
    email: str 
    password: str


# data = User.find(User.pk == "01HSHBX59GDK9CT0P2BMF4Q8DS")

# print(data[0])