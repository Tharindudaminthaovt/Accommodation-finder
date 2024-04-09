from config import db, bcrypt
import base64

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(140), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    user_type = db.Column(db.String(40), unique=False, nullable=False)
    properties = db.relationship('Property', backref='user', lazy=True)
    reservations = db.relationship('Reservation', backref='user', lazy=True)

    def set_password(self, pwd):
        self.password = bcrypt.generate_password_hash(pwd).decode('utf-8')
    
    def check_password(self, pwd):
        return bcrypt.check_password_hash(self.password, pwd)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "userType": self.user_type,
        }

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id') ,nullable=False) #have to set this for foriegn key
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'), nullable=False)
    offer = db.Column(db.Float, unique=False ,nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False)
    Accept = db.Column(db.Boolean, default=False)
    pending= db.Column(db.Boolean, default=True)

    def to_json(self):
        return {
            "id": self.id,
            "studentId": self.student_id,
            "propertyId": self.property_id,
            "offer": self.offer,
            "date": self.date,
            "accept": self.Accept,
            "pending": self.pending
        }

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    heading = db.Column(db.String(200), nullable=False, unique=False)
    content = db.Column(db.String(6000), nullable=False, unique=False)

    def to_json(self):

        return {
            "id": self.id,
            "heading": self.heading,
            "content": self.content,
        }

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False, unique=False) #need to make thge connection to user table
    name = db.Column(db.String(100), nullable=False, unique=False)
    latitude = db.Column(db.REAL, nullable=False, unique=False)
    longitude = db.Column(db.REAL, nullable=False, unique=False)
    price = db.Column(db.Float, nullable=False, unique=False)
    about = db.Column(db.String(2000), nullable=False, unique=False)
    approved = db.Column(db.Boolean, default=False)
    pending = db.Column(db.Boolean, default=True)

    images = db.relationship('PropertyImg', backref='property')
    reservations = db.relationship("Reservation", backref="property", lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "owner": self.owner,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "price": self.price,
            "about": self.about,
            "approved": self.approved,
            "pending": self.pending,
        }

class PropertyImg(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    property_id = db.Column(db.Integer, db.ForeignKey('property.id'))
    filename = db.Column(db.String(100))
    image = db.Column(db.Text, unique=True, nullable=False)
    img_type = db.Column(db.Text, nullable=False)

    def to_json(self):
        image_data_decoded = base64.b64decode(self.image).decode('utf-8')

        return {
            "id": self.id,
            "properyId": self.property_id,
            "filename": self.filename,
            "image": image_data_decoded, 
            "imgType": self.img_type,
        }