from redis_om import (Field, JsonModel,Migrator, HashModel)
from pydantic import ValidationError
from typing import Optional
import redis
from Models import User

# r = redis.Redis(
#   host='redis-13404.c14.us-east-1-2.ec2.cloud.redislabs.com',
#   port=13404,
#   password='n3pRbBl2Y9oMdJ7J36QTPHzJBPPSAaQQ')
r = redis.Redis(host = 'localhost', port = 6379, decode_responses = True, db=0)


class Host(JsonModel):
    owner: str = Field(index=True)
    title: str
    desc: str
    addressNumber: str
    addressStreet: str
    cityStateZip: str
    uploadedPhotos: Optional[list]
    perks: Optional[list]


# host = Host(
#     owner = '01HSHBX59GDK9CT0P2BMF4Q8DS',
#     addressNumber = 1112,
#     adressStreet =  'Elm st'
# )
# host.save()
# Migrator().run()

# host = Host.find(Host.owner == '01HTDDNEVB6GJW94WVYFQF69JY')
# host.desc = "Lorem ipsum!!!"
# host.save()

# host = Host.find().all()
# host_list = []
# for i in host:
#     # print(dict(i))
#     host_list.append(dict(i))

# print(host_list)
