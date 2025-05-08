import sqlite3
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

auth = Blueprint("auth", __name__)
bcrypt = Bcrypt()
# bcrypt.init_app(auth)

DATABASE = "./social-books.db"

def db_connect():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    fname = data.get("firstName")
    lname = data.get("lastName")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    conn = db_connect()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO users (username, password, first_name, last_name) VALUES (?, ?, ?, ?)", (username, hashed_password, fname, lname))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"error": "Username already exists"}), 409

    conn.close()
    return jsonify({"message": "User registered successfully"}), 201

@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = db_connect()
    cursor = conn.cursor()

    user = cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()

    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=username)
    conn.close()
    return jsonify({"access_token": access_token}), 200
