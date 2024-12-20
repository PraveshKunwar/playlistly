from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

def create():
    load_dotenv()
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
    app.secret_key = os.urandom(24)

    from .auth import auth_bp
    from .routes import routes_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(routes_bp)
    return app

