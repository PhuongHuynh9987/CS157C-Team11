from redis_om import (Field, JsonModel,Migrator, HashModel)
from typing import Optional
from pydantic import ValidationError
import redis

r = redis.Redis(host = 'localhost', port = 6379, decode_responses = True, db=0)

class User(JsonModel):
    username: str = Field(index=True)
    firstName: str 
    lastName: str
    email: str 
    desc: Optional[str]
    password: str
    profilePhoto: Optional[str]
    gender: Optional[str]
    status: Optional[str]
    bookingHistory: Optional[list]
