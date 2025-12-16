from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

profile_data = None


@app.route("/api/profile", methods=["POST"])
def save_profile():
    global profile_data
    profile_data = request.json
    return jsonify({"success": True})


@app.route("/api/profile", methods=["GET"])
def get_profile():
    return jsonify(profile_data)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
