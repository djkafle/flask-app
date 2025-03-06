from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

# Backend URL (use the Kubernetes service name)
BACKEND_URL = "http://backend-service:5001"  # Kubernetes backend service URL

@app.route("/")
def home():
    return redirect(url_for('dashboard'))

@app.route("/dashboard")
def dashboard():
    try:
        # Fetch data from the backend
        response = requests.get(f"{BACKEND_URL}/users")
        if response.status_code == 200:
            users = response.json()
            return render_template("dashboard.html", users=users)
        else:
            return f"Error: Backend returned status code {response.status_code}.", 500
    except requests.exceptions.RequestException as e:
        return f"Error: Unable to connect to the backend. {str(e)}", 500

@app.route("/form")
def form():
    return render_template("form.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form.get("name")
    email = request.form.get("email")

    if not name or not email:
        return "Error: Name and email are required.", 400

    data = {"name": name, "email": email}
    try:
        # Send data to the backend
        response = requests.post(f"{BACKEND_URL}/submit", json=data)
        if response.status_code == 200:
            return redirect(url_for('dashboard'))
        else:
            return f"Error: Backend returned status code {response.status_code}.", 500
    except requests.exceptions.RequestException as e:
        return f"Error: Unable to connect to the backend. {str(e)}", 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
