from flask import request, jsonify, session
from config import app, db
from models import User, Reservation, Article, Property, PropertyImg
from werkzeug.utils import secure_filename

# User related api routes and methods

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token,Authorization, Access-Control-Request-Method, Access-Control-Allow-Headers')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  return response

@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users =list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users})


@app.route("/create_user", methods=["POST"])
def create_user():
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")
    user_type = request.json.get("userType")

    if not username or not email or not password or not user_type:
        return (jsonify({"message": "you must include id, username, email, password and usertype to create a user"}), 400)

    new_user = User(username=username, email=email, user_type=user_type)
    new_user.set_password(password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User created"}), 201

@app.route("/update_password/<user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "user not found"}), 404
    
    data = request.json
    user.username = data.get("username", user.username)
    user.password = data.get("password", user.password)
    user.user_type = data.get("userType", user.user_type)

    db.session.commit()
    return jsonify({"message": "user password updated"}), 200

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "user not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted"}), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return jsonify({"message": "login successfull"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 404

# Property related routes and methods 

#create property
@app.route("/create_property", methods=["POST"])
def create_property():
    owner = request.json.get("owner")
    name = request.json.get("name")
    latitude = request.json.get("latitude")
    longitude = request.json.get("longitude")
    price = request.json.get("price")
    about = request.json.get("about")

    if not owner or not name or not latitude or not longitude or not price or not about:
        return (jsonify({"message": "you must include all the data related to a property"}), 400)
    

    new_property = Property(owner=owner, name=name, latitude=latitude, longitude=longitude, price=price, about=about)

    try:
        db.session.add(new_property)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Property created"}), 201

#getproperty
@app.route("/properties", methods=["GET"])
def get_properties():
    properties = Property.query.all()
    json_properties = list(map(lambda x: x.to_json(), properties))
    return jsonify({"properties": json_properties})

#update property
@app.route("/update_property/<int:property_id>", methods=['PATCH'])
def update_property(property_id):
    propertyItem = session.get(Property, property_id)

    if not propertyItem:
        return jsonify({"message": "property not found"}), 404
    
    data = request.json
    propertyItem.owner = data.get("owner", propertyItem.owner)
    propertyItem.name = data.get("name", propertyItem.name)
    propertyItem.latitude = data.get("latitude", propertyItem.latitude)
    propertyItem.longitude = data.get("longitude", propertyItem.longitude)
    propertyItem.price = data.get("price", propertyItem.price)
    propertyItem.about = data.get("about", propertyItem.about)
    propertyItem.approved = data.get("approved", propertyItem.approved)
    propertyItem.pending = data.get("pending", propertyItem.pending)

    db.session.commit()

    return jsonify({"message": "Property data updated!"}), 200

#delete property
@app.route("/delete_property/<int:property_id>", methods=["DELETE"])
def delete_property(property_id):
    property = Property.session.get(property_id)

    if not property:
        return jsonify({"message": "property not found"}), 404

    db.session.delete(property)
    db.session.commit()

    return jsonify({"message": "Property deleted"}), 200

@app.route("/pending_properties", methods=["GET"])
def get_pending_properties():
    properties = Property.query.filter_by(approved=False).all()
    json_pending_properties = list(map(lambda x: x.to_json(), properties))
    return jsonify({"properties": json_pending_properties})

#Reservation related routes and methods

@app.route("/reservations", methods=["GET"])
def get_reservations():
    reservations = Reservation.query.all()
    json_reservations =list(map(lambda x: x.to_json(), reservations))
    return jsonify({"reservations": json_reservations})


@app.route("/create_reservation", methods=["POST"])
def create_reservation():
    student_id = request.json.get("studentId")
    property_id = request.json.get("propertyId")
    offer = request.json.get("offer")
    date = request.json.get("date")
    Accept = request.json.get("accept")
    pending = request.json.get("pending")

    if student_id or not offer or not date or not Accept or not pending or not property_id:
        return (jsonify({"message": "you must include all the data related to reservation"}), 400)
    
    new_reservation = Reservation(student_id=student_id, property_id=property_id, offer=offer, date=date, Accept=Accept, pending=pending)

    try:
        db.session.add(new_reservation)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Reservation created"}), 201

# update reservation
@app.route("/update_resevation/<int:reservation_id>", methods=["PATCH"])
def update_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)

    if not reservation:
        return jsonify({"message": "Reservation not found"}), 404
    
    data = request.json
    reservation.student_id = data.get("studentId", reservation.student_id)
    reservation.property_id = data.get("propertyId", reservation.property_id)
    reservation.offer = data.get("offer", reservation.offer)
    reservation.date = data.get("date", reservation.date)
    reservation.Accept = data.get("accept", reservation.Accept)
    reservation.pending = data.get("pending", reservation.pening)

    db.session.commit()

    return jsonify({"message": "Reservation updated successfully"}), 200

@app.route("/delete_reservation/<int:reservation_id>", methods=["DELETE"])
def delete_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)

    if not reservation:
        return jsonify({"message": "Reservation not found"}), 404
    
    db.session.delete(reservation)
    db.session.commit()

    return jsonify({"message": "reservation deleted"}), 200

# article routes

@app.route("/create_article", methods=["POST"])
def create_article():
    heading = request.json.get("heading")
    content = request.json.get("content")

    if not heading or not content:
        return (jsonify({"message": "you must include all data related to an article"}), 400)

    new_article = Article(heading=heading, content=content)

    try:
        db.session.add(new_article)
        db.session.commit()
    except Exception as e:
         return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "article created"}), 201

@app.route("/delete_article/<int:article_id>", methods=["DELETE"])
def delete_article(article_id):
    article = Article.query.get(article_id)

    if not article:
        return jsonify({"message": "article not found"}), 404
    
    db.session.delete(article)
    db.session.commit()

    return jsonify({"message": "Article deleted successfully"}), 200

@app.route("/articles", methods=["GET"])
def get_article():
    articles = Article.query.all()
    json_articles =list(map(lambda x: x.to_json(), articles))
    return jsonify({"articles": json_articles})

# image handling

@app.route("/upload_images", methods=["POST"])
def upload_images():
    image = request.files["img"] # set the html input tags name to img

    if not image:
        return jsonify({"message": "image not found"}), 400

    property_id = request.json.get("propertyId")
    filename = secure_filename(image.filename)
    img_type= image.mimetype
    new_image = PropertyImg(property_id=property_id, filename=filename, image=image.read(), img_type=img_type)

    try:
        db.session.add(new_image)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "image uploaded successfully"}), 201

@app.route("/property_images/<int:property_id>", methods=["GET"])
def get_property_images(property_id):
    images = PropertyImg.query.filter_by(property_id=property_id).all()

    if not images:
        return jsonify({"message": "There are no images for this id"}), 404
    
    property_images_json = [image.to_json() for image in images]

    return jsonify({"images": property_images_json})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)