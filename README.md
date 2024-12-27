# playlistly

A simple playlist generator using Spotify's API to generate playlists based off your listening history and top tracks.

## Installation

1. Clone the package either with HTTPS or SSH
2. Install all necessary packages, and for server as well (check requirements.txt)

```bash
npm install
cd server
pip install <packages>
```


## Usage
Create a .env file, and fill it with the following credentials:
```bash
CLIENT_ID=obtain from Spotifys Dashboard
CLIENT_SECRET=obtain from Spotifys Dashboard
REDIRECT_URI=http://localhost:5000/callback (update this in the dashboard aswell)
```
To run, do the following
```bash
npm run dev
cd server
python3 main.py
```
## License

[MIT](https://choosealicense.com/licenses/mit/)
