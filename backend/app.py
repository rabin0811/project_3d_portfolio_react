import os
import json
import sqlite3
from datetime import datetime, timezone
from flask import Flask, request, jsonify, g, render_template
from flask_cors import CORS
from config import settings

app = Flask(__name__)
CORS(app, origins=settings.cors_origins)

DB_PATH = os.path.join(os.path.dirname(__file__), settings.DATABASE_URL.replace("sqlite:///", ""))


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
        g.db.execute(
            """CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )"""
        )
        g.db.execute(
            """CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data TEXT NOT NULL
            )"""
        )
        g.db.commit()
    return g.db


@app.teardown_appcontext
def close_db(exception):
    db = g.pop("db", None)
    if db is not None:
        db.close()


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()})


@app.route("/admin")
def admin_panel():
    return render_template("admin.html")


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    errors = {}
    if len(name) < 2:
        errors["name"] = "Name must be at least 2 characters"
    if "@" not in email or "." not in email:
        errors["email"] = "Invalid email address"
    if len(message) < 10:
        errors["message"] = "Message must be at least 10 characters"

    if errors:
        return jsonify({"error": "Validation failed", "fields": errors}), 422

    try:
        db = get_db()
        db.execute(
            "INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)",
            (name, email, message, datetime.now(timezone.utc).isoformat()),
        )
        db.commit()
    except Exception as e:
        app.logger.error("Database error: %s", e)
        return jsonify({"error": "Internal server error"}), 500

    app.logger.info("Contact saved: %s <%s>", name, email)
    return jsonify({"status": "success", "message": "Message received. I'll get back to you soon!"}), 200


@app.route("/api/profile", methods=["GET"])
def get_profile():
    db = get_db()
    row = db.execute("SELECT * FROM profile ORDER BY id DESC LIMIT 1").fetchone()
    if row:
        data = json.loads(row["data"])
    else:
        data = {
            "name": "Rabin Humagain",
            "email": "rabinhumagain444@gmail.com",
            "bio": "Motivated and self-driven Computer Engineering student with interest in software development, networking, Linux systems, and modern web technologies. I enjoy building full-stack applications, learning new technologies, and solving real-world problems through code.",
            "roles": ["Computer Engineering Student", "Full Stack Developer", "Backend Enthusiast", "Linux Learner"],
            "social": {
                "github": "https://github.com/rabin0811",
                "linkedin": "https://www.linkedin.com/in/rabin-humagain-417a35410",
                "facebook": "https://facebook.com/rabin.humagai",
                "instagram": "https://instagram.com/__ra_bin__"
            },
            "education": [
                {"level": "SEE", "institution": "Shree Karthari Secondary School", "period": "Passed 2073", "description": "Completed secondary education with a focus on basic sciences and mathematics."},
                {"level": "+2 Science", "institution": "Balnikital Higher Secondary School", "period": "2074 - 2076", "description": "Higher secondary education in the science stream, building foundation for engineering."},
                {"level": "Bachelor in Computer Engineering", "institution": "ISMT College", "period": "2081 - Present", "description": "Pursuing a degree in Computer Engineering with coursework in programming, networking, and systems."}
            ],
            "skills": [
                {"title": "Languages and Frameworks", "items": ["HTML", "CSS", "JavaScript", ".NET Framework"]},
                {"title": "Development Concepts", "items": ["CRUD Operations", "OOP", "Abstraction"]},
                {"title": "Tools and Version Control", "items": ["Git", "GitHub"]},
                {"title": "Systems and Infrastructure", "items": ["Windows", "Linux", "Networking", "Hardware Troubleshooting"]}
            ],
            "certifications": [
                {"title": "Cisco Networking Academy", "description": "Networking and cybersecurity fundamentals certification covering routing, switching, and network security principles."},
                {"title": "Computer Hardware Training Level 2", "description": "Hardware troubleshooting and system maintenance training focused on diagnostics, repair, and component-level understanding."}
            ]
        }
    return jsonify(data)


@app.route("/api/admin/messages", methods=["GET"])
def admin_messages():
    auth = request.headers.get("Authorization", "")
    if auth != f"Bearer {settings.SECRET_KEY}":
        return jsonify({"error": "Unauthorized"}), 401

    db = get_db()
    rows = db.execute("SELECT * FROM contacts ORDER BY created_at DESC").fetchall()
    return jsonify([dict(r) for r in rows])


if __name__ == "__main__":
    os.makedirs(os.path.dirname(DB_PATH) or ".", exist_ok=True)
    app.run(debug=True, port=settings.PORT)
