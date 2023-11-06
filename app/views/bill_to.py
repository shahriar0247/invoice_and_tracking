
import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.invoice import Bill_to, Company, Invoice, Ship_from, Ship_to

@app.route("/bill_to")
def bill_to_view():
    return render_template("bill_to.html")


@app.route("/get/bill_to")
def get_bill_to_view():
    all_bills = []
    all_bills_raw = Bill_to.query.all()
    for bill_to in all_bills_raw:
        bill_to_object = {}
        bill_to_object["name"] = bill_to.name 
        bill_to_object["address1"] = bill_to.address1 
        bill_to_object["address2"] = bill_to.address2 
        bill_to_object["address3"] = bill_to.address3 
        bill_to_object["tel"] = bill_to.tel 
        bill_to_object["fax"] = bill_to.fax 
        bill_to_object["gst"] = bill_to.gst 
        bill_to_object["bank_details"] = bill_to.bank_details 
        all_bills.append(bill_to_object)

    return jsonify(bill_to_object)


@app.route("/create/bill_to", methods=["POST"])
def create_bill_to_view():
    try:
        db.session.query(Company).delete()
        db.session.commit()
    except:
        db.session.rollback()

    data = request.json  
    new_bill_to = Company(
        name=data["name"],
        address1=data["address1"],
        address2=data["address2"],
        address3=data["address3"],
        tel=data["tel"],
        fax=data["fax"],
        gst=data["gst"],
        bank_details=data["bank_details"],
    )

    db.session.add(new_bill_to)
    db.session.commit()
    
    return "Invoice created successfully"