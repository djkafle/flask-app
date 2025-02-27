from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)

# Backend URL
BACKEND_URL = "http://localhost:5001/submit"  # Local backend URL

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")

    if not first_name or not last_name:
        return "Error: First name and last name are required.", 400

    data = {"first_name": first_name, "last_name": last_name}
    try:
        response = requests.post(BACKEND_URL, json=data)
        if response.status_code == 200:
            return redirect("/")
        else:
            return f"Error: Backend returned status code {response.status_code}.", 500
    except requests.exceptions.RequestException as e:
        return f"Error: Unable to connect to the backend. {str(e)}", 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)