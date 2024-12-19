from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/playlists")
def playlists():
    return {"playlists": ["1", "2", "3"]}

if __name__ == "__main__":
    app.run(debug=True)