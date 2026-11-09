from flask import jsonify


def validate_contact(data):
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
        return {"valid": False, "errors": errors, "name": name, "email": email, "message": message}

    return {"valid": True, "errors": {}, "name": name, "email": email, "message": message}
