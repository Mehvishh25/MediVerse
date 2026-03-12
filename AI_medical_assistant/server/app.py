import os
from dotenv import load_dotenv

# Load env FIRST
load_dotenv()

from flask import Flask
from flask_cors import CORS
from routes import register_routes

# Optional but recommended
if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError("GOOGLE_API_KEY missing. Check .env")

app = Flask(__name__, static_url_path="/static", static_folder="temp")

CORS(app)
register_routes(app)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
