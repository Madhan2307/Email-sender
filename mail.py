from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] =  "rmadhannpm@gmail.com"
app.config["MAIL_PASSWORD"] =   "ktjz uaqn wjdn oeel"
app.config["MAIL_DEFAULT_SENDER"] = "madhanramasamy6@gmail.com"
mail = Mail(app)

@app.post("/send-mail")
def send_mail():
    body = request.json or {}
    to = body.get("to")
    subject = body.get("subject", "No Subject")
    message_text = body.get("message", "")

    if not to:
        return jsonify({"success": False, "message": "'to' is required"}), 400

    msg = Message(subject=subject, recipients=[to])
    msg.body = message_text

    try:
        mail.send(msg)
        return jsonify({"success": True, "message": "Email sent"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)