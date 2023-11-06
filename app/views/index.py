from flask import render_template
from app import app
from app.models.invoice import Invoice

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/invoice")
def invoice():
    invoice = Invoice.query.all()
    return render_template("invoice.html", invoice=invoice)

 
    
    
