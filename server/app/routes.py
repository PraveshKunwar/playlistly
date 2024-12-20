from flask import Blueprint, session, jsonify, redirect
import requests

routes_bp = Blueprint('routes', __name__)

@routes_bp.route('/me')
def me():
    access_token = session.get('access_token')
    if not access_token:
        return jsonify({"error": "Unauthorized"}), 401
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get("https://api.spotify.com/v1/me", headers=headers)
    if response.status_code == 200:
        return jsonify(response.json())
    return jsonify({"error": "Failed to fetch user data"}), response.status_code
