from flask import Blueprint, session, jsonify, redirect, request
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

@routes_bp.route('/me/top', methods=['POST'])
def top():
    access_token = session.get('access_token')
    if not access_token:
        return jsonify({"error": "Unauthorized"}), 401
    data = request.json
    item_type = data.get('type', 'artists')
    time_range = data.get('time_range', 'medium_term')
    limit = data.get('limit', 10)
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    params = {
        'time_range': time_range,
        'limit': limit
    }
    url = f"https://api.spotify.com/v1/me/top/{item_type}"
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        return jsonify(response.json())
    return jsonify({"error": "Failed to fetch top items"}), response.status_code