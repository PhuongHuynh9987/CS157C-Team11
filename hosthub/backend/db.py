from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Account(db.Model):
    __tablename__ = 'Account'

    account_id = db.Column('account_id', db.Integer, primary_key=True,autoincrement =True)
    name = db.Column(db.String(), nullable = False)
    username = db.Column(db.String(), nullable = False)
    password = db.Column(db.String(), nullable = False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    type = db.Column(db.String(1), nullable=False)

    __table_args__ = (
        db.CheckConstraint("gender in ('M','F','O')", name = 'gender_check'),
        db.CheckConstraint("type in ('S','H')", name = 'account_type_check')
    )

    def __init__(self, name: str, username : str, password: str, age: int, gender: str, email: str, type: str):
        self.name=name
        self.username=username
        self.password=password
        self.age=age
        self.gender=gender
        self.email=email
        self.type=type

    def serialize(self):
        return{
            'account_id' : self.account_id,
            'name' : self.name,
            'username' : self.username,
            'password' : self.password,
            'age' : self.age,
            'gender' : self.gender,
            'email' : self.email,
            'type' : self.type
        }
    
class Listing(db.Model):
    __tablename__ = 'Listing'

    listing_id = db.Column('listing_id', db.Integer, primary_key=True,autoincrement =True)
    host_id = db.Column(db.Integer, db.ForeignKey('Account.account_id'),nullable=False)
    address = db.Column(db.String(), nullable = False)
    zipcode = db.Column(db.String(5), nullable = False)
    description = db.Column(db.String(), nullable = False)
    price = db.Column(db.Integer, nullable=False)
    open = db.Column(db.Boolean, nullable=False)

    def __init__(self, listing_id: int, host_id: int, address: str, zipcode: str, description: str, price: int, open:bool):
        self.listing_id=listing_id,
        self.host_id=host_id,
        self.address=address,
        self.zipcode=zipcode,
        self.description=description,
        self.price=price,
        self.open=open

    def serialize(self):
        return{
            'listing_id' : self.listing_id,
            'host_id' : self.host_id,
            'address' : self.address,
            'zipcode' : self.zipcode,
            'description' : self.description,
            'price' : self.price,
            'open' : self.open
        }
    
class Bookings(db.Model):
    __tablename__ = 'Listing'

    booking_id = db.Column('booking_id', db.Integer, primary_key=True,autoincrement =True)
    customer_id = db.Column(db.Integer, db.ForeignKey('Account.account_id'),nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('Account.account_id'),nullable=False)
    address = db.Column(db.String(), nullable = False)
    zipcode = db.Column(db.String(5), nullable = False)
    description = db.Column(db.String(), nullable = False)
    price = db.Column(db.Integer, nullable=False)

    def __init__(self, listing_id: int, host_id: int, address: str, zipcode: str, description: str, price: int):
        self.listing_id=listing_id,
        self.host_id=host_id,
        self.address=address,
        self.zipcode=zipcode,
        self.description=description,
        self.price=price

    def serialize(self):
        return{
            'listing_id' : self.listing_id,
            'account_id' : self.account_id,
            'address' : self.address,
            'zipcode' : self.zipcode,
            'description' : self.description,
            'price' : self.price
        }
