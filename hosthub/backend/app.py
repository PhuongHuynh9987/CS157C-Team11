import db
from flask import Flask
from flask_cors import CORS
from flask import request, jsonify

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///HostHub.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db.db.init_app(app)

@app.route('/createAccount', methods=['POST'])
def create_account():
    return

@app.route('/editAccount', methods=['PATCH'])
def edit_account():
    return

@app.route('/createListing', methods=['POST'])
def create_listing():
    return

@app.route('/editListing', methods=['PATCH'])
def edit_listing():
    return

#multiple
@app.route('/viewListings', methods=['GET'])
def view_listings():
    return

#one
@app.route('/viewListing', methods=['GET'])
def view_listing():
    return


@app.route('/bookStay', methods=['POST'])
def book_stay():
    return

#multiple
@app.route('/viewBookings', methods=['GET'])
def view_bookings():
    return

#one
@app.route('/viewBooking', methods=['GET'])
def view_booking():
    return

if __name__ == '__main__':
    with app.app_context():
        db.db.create_all()
    app.run(debug=True, port=8000, host='0.0.0.0')