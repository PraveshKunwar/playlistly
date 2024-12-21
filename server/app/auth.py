from flask import Blueprint, redirect, request, session, jsonify
import requests
from urllib.parse import urlencode
import os
from dotenv import load_dotenv

load_dotenv()
auth_bp = Blueprint('auth', __name__)

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = os.getenv('REDIRECT_URI')

# Login Route
@auth_bp.route('/login')
def login():
    scopes = "ugc-image-upload " \
         "user-read-playback-state user-modify-playback-state user-read-currently-playing " \
         "app-remote-control streaming " \
         "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public " \
         "user-follow-modify user-follow-read " \
         "user-read-playback-position user-top-read user-read-recently-played " \
         "user-library-modify user-library-read " \
         "user-read-email user-read-private"
    auth_url = "https://accounts.spotify.com/authorize?" + urlencode({
        'response_type': 'code',
        'client_id': CLIENT_ID,
        'scope': scopes,
        'redirect_uri': REDIRECT_URI,
    })
    return redirect(auth_url)

# Callback Route
@auth_bp.route('/callback')
def callback():
    code = request.args.get('code')
    token_url = "https://accounts.spotify.com/api/token"
    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
        }
    response = requests.post(token_url, data=data)
    tokens = response.json()
    session['access_token'] = tokens['access_token']
    session['refresh_token'] = tokens['refresh_token']
    access_token = tokens['access_token']
    headers = {'Authorization': f'Bearer {access_token}'}
    user_response = requests.get("https://api.spotify.com/v1/me", headers=headers)
    if user_response.status_code == 200:
        user_data = user_response.json()
        session['user_id'] = user_data.get('id')  # Store user_id in session
    else:
        return jsonify({"error": "Failed to fetch user data"}), user_response.status_code

    return redirect('http://localhost:5173/generate')

# Refresh token Route
@auth_bp.route('/refresh')
def refresh():
    refresh_token = session.get('refresh_token')
    if not refresh_token:
        return redirect('/login')
    token_url = "https://accounts.spotify.com/api/token"
    data = {
        'grant_type': 'refresh_token',
        'code': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
        }
    response = requests.post(token_url, data=data)
    tokens = response.json()
    session['access_token'] = tokens.get('access_token')
    return 'token has been refreshed.'

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200