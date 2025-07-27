from flask import Flask, request, render_template, redirect
import sqlite3
import bcrypt

app = Flask(__name__)

# Create database if not exists
def init_db():
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )""")
    conn.commit()
    conn.close()

init_db()

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        nickname = request.form["nickname"]
        email = request.form["email"]
        password = request.form["password"]

        # Hash password
        hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

        try:
            conn = sqlite3.connect("users.db")
            cur = conn.cursor()
            cur.execute("INSERT INTO users (nickname, email, password) VALUES (?, ?, ?)",
                        (nickname, email, hashed_pw))
            conn.commit()
            conn.close()
            return "✅ Signup successful!"
        except sqlite3.IntegrityError:
            return "❌ Email already used!"

    return render_template("signup.html")

if __name__ == "__main__":
    app.run(debug=True)
