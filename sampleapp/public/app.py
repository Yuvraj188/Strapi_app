import sqlite3
import requests
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mainUrl = 'http://localhost:1337/api/students'  # Corrected endpoint

def connection():
    conn = sqlite3.connect('strapi.db')
    return conn.cursor(), conn

@app.route('/', methods=["GET"])
def get_student():
    c, conn = connection()
    c.execute('''CREATE TABLE IF NOT EXISTS students(id INT UNIQUE, name TEXT, rollno INT, passed BOOLEAN)''')
    response = requests.get(mainUrl)  # Use the correct endpoint here
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from API"}), 500
    
    data = response.json()
    for student in data["data"]:  # Access the 'data' key
        try:
            c.execute('''INSERT INTO student(id, name, rollno, passed) VALUES(?,?,?,?)''', 
                      (student['id'], student['attributes']['Name'], student['attributes']['Rollnumber'], student['attributes']['Passed']))
        except:
            pass
        conn.commit()

    c.execute('''SELECT * FROM student''')
    rows = c.fetchall()
    conn.close()

    student_data = []
    for row in rows:
        student_data.append({
            'id': row[0],
            'name': row[1],
            'rollno': row[2],
            'passed': row[3]
        })
    return jsonify(student_data)

if __name__ == "__main__":
    app.run(debug=True)
