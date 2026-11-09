import json
import sqlite3
import os
from dotenv import load_dotenv

load_dotenv()

DB_PATH = os.path.join(os.path.dirname(__file__), "portfolio.db")

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

db = sqlite3.connect(DB_PATH)
db.execute("CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT NOT NULL)")
db.execute("DELETE FROM profile")
db.execute("INSERT INTO profile (data) VALUES (?)", (json.dumps(data),))
db.commit()
db.close()

print("Profile seeded successfully.")
