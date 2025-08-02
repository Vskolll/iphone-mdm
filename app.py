from flask import Flask, request, jsonify
import json, os

app = Flask(__name__)
DATA_FILE = "data.json"

@app.route("/upload", methods=["GET", "POST"])
def upload():
    if request.method == "POST":
        data = request.json
    else:
        data = request.args.get("data")
        if data:
            data = json.loads(data)
    if data:
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return jsonify({"status": "ok"})
    return jsonify({"status": "no data"}), 400

@app.route("/data", methods=["GET"])
def get_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return f.read()
    return jsonify([])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
