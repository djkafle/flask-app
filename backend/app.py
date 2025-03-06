from flask import Flask, request, jsonify, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Database configuration
db_config = {
    'user': 'sqluser',
    'password': 'sqlpassword',
    'host': 'database-service',  # Kubernetes service name
    'database': 'sql_database',
    'port': '3306'
}

@app.route("/users", methods=["GET"])
def get_users():
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Fetch all users
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()

        # Close the connection
        cursor.close()
        conn.close()

        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/submit", methods=["POST"])
def submit():
    # Get form data
    name = request.form.get("name")
    email = request.form.get("email")

    if not name or not email:
        return "Error: Name and email are required.", 400

    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insert data into the database
        query = "INSERT INTO users (name, email) VALUES (%s, %s)"
        cursor.execute(query, (name, email))
        conn.commit()

        # Close the connection
        cursor.close()
        conn.close()

        # Redirect to the dashboard after successful submission
        return redirect(url_for('dashboard'))
    except Exception as e:
        return f"Error: {str(e)}", 500

@app.route("/dashboard")
def dashboard():
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Fetch all users
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()

        # Close the connection
        cursor.close()
        conn.close()

        # Render the dashboard template with user data
        return render_template("dashboard.html", users=users)
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
