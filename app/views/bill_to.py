
import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_from, Ship_to

@app.route("/bill_to")
def bill_to_view():
    print("coming here")
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

        all_bills.append(bill_to_object)

    return jsonify(all_bills)


@app.route("/create/bill_to", methods=["POST"])
def create_bill_to_view():

    data = request.json  
    new_bill_to = Bill_to(
        name=data["name"],
        address1=data["address1"],
        address2=data["address2"],
    )

    db.session.add(new_bill_to)
    db.session.commit()
    
    return "Invoice created successfully"