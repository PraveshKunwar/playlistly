from flask import Blueprint, session, jsonify, redirect, request
import requests
import random
import string

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
    items = []
    url = f"https://api.spotify.com/v1/me/top/{item_type}"
    while url:
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch top items"}), response.status_code
        data = response.json()
        items.extend(data.get('items', []))
        url = data.get('next')
    return jsonify(items)

from flask import request, jsonify, session
import requests

def generate_random_string(length):
    """Generates a random string of letters and digits."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

@routes_bp.route('/gen/playlist', methods=['POST'])
def generate():
    # Get data from request
    data = request.json
    artists = data.get('artists', [])

    if not artists:
        return jsonify({"error": "No artists provided"}), 400
    
    # Get access token from session
    access_token = session.get('access_token')
    if not access_token:
        return jsonify({"error": "User not authenticated"}), 401
    
    items = []
    for artist in artists:
        artist_id = artist.get('id')
        if not artist_id:
            return jsonify({"error": f"Invalid artist ID for artist: {artist}"}), 400
        # Fetch top tracks for the artist
        url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks"
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.get(url, headers=headers, params={'market': 'US'})
        if response.status_code != 200:
            return jsonify({"error": f"Failed to fetch top tracks for artist ID {artist_id}"}), response.status_code
        tracks_data = response.json()
        track_uris = [track['uri'] for track in tracks_data.get('tracks', [])]
        items.extend(track_uris)
    if not items:
        return jsonify({"error": "No tracks found for the provided artists"}), 400
    # Create a new playlist
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID not found in session"}), 400
    create_playlist_url = f"https://api.spotify.com/v1/users/{user_id}/playlists"
    create_headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    playlist_data = {
        'name': generate_random_string(10),
        'description': "playlistly generated playlist!",
        'public': True,
        'collaborative': False
    }
    create_playlist_response = requests.post(create_playlist_url, headers=create_headers, json=playlist_data)
    if create_playlist_response.status_code != 201:
        return jsonify({"error": "Failed to create playlist"}), create_playlist_response.status_code
    created_playlist = create_playlist_response.json()
    playlist_id = created_playlist['id']
    
    # Add tracks to the playlist in chunks of 100
    add_tracks_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    for i in range(0, len(items), 100):
        chunk = items[i:i + 100]
        add_tracks_response = requests.post(add_tracks_url, headers=create_headers, json={"uris": chunk})
        if add_tracks_response.status_code != 201:
            return jsonify({"error": f"Failed to add tracks to playlist at chunk {i // 100}"}), add_tracks_response.status_code
    return jsonify({
        "message": "Playlist successfully created and tracks added!",
        "playlist_id": playlist_id,
        "playlist_url": created_playlist.get('external_urls', {}).get('spotify'),
        "tracks_added": len(items)
    })
