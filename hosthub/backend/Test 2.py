import redis
# from redis.commands.json.path import Path
# import redis.commands.search.aggregation as aggregations
# import redis.commands.search.reducers as reducers
from redis.commands.search.field import TextField, NumericField, TagField
# from redis.commands.search.indexDefinition import IndexDefinition, IndexType
# from redis.commands.search.query import NumericFilter, Query

from redis_om import (Field, Migrator, JsonModel,HashModel)



r = redis.Redis(host='redis-13404.c14.us-east-1-2.ec2.cloud.redislabs.com', 
            port=1340, password="n3pRbBl2Y9oMdJ7J36QTPHzJBPPSAaQQ")

# client = createClient({
#     password: 'n3pRbBl2Y9oMdJ7J36QTPHzJBPPSAaQQ'
# })

class User(JsonModel): 
    username: str = Field(index=True)
    # email: str
    password: str


hi = User(
    username= 'phuong',
    password= 'pass'
    )
hi.save()