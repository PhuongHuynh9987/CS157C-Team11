from redis_om import (Field, JsonModel,Migrator, HashModel)
from pydantic import ValidationError
import redis
from Models import User, Host

r = redis.Redis(host = 'localhost', port = 6379, decode_responses = True, db=0)

class Booking(JsonModel):
    user: str = Field(index=True)
    host: str
    date: str # booking dates