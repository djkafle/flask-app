from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Database connection details
config = {
    'user': 'sqluser',
    'password': 'sqlpassword',
    'host': 'database-service',  # Kubernetes service name
    'database': 'sql_database',
    'port': '3306'  # Default MySQL port
}

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    first_name = data["first_name"]
    last_name = data["last_name"]

    try:
        # Connect to the database
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        # Insert data into the database
        query = "INSERT INTO users (first_name, last_name) VALUES (%s, %s)"
        cursor.execute(query, (first_name, last_name))
        conn.commit()

        # Close the connection
        cursor.close()
        conn.close()

        return jsonify({"message": "Data inserted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
