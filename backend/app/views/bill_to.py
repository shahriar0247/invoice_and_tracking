import json

from flask import jsonify, redirect, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_from, Ship_to


@app.route("/get/type/<type>")
def get_bill_to_view(type):
    all_bills = []
    if type == "ship_from":
        all_bills_raw = Ship_from.query.all()
    elif type == "bill_to":
        all_bills_raw = Bill_to.query.all()
    elif type == "ship_to":
        all_bills_raw = Ship_to.query.all()
    for bill_to in all_bills_raw:
        bill_to_object = {}
        bill_to_object["id"] = bill_to.id
        bill_to_object["name"] = bill_to.name
        bill_to_object["address1"] = bill_to.address1
        bill_to_object["address2"] = bill_to.address2

        all_bills.append(bill_to_object)

    return jsonify(all_bills)


@app.route("/create/type/<type>", methods=["POST"])
def create_bill_to_view(type):
    data = request.json
    if type == "ship_from":
        new_bill_to = Ship_from(
            name=data["name"],
            address1=data["address1"],
            address2=data["address2"],
        )
    elif type == "bill_to":
        new_bill_to = Bill_to(
            name=data["name"],
            address1=data["address1"],
            address2=data["address2"],
        )
    elif type == "ship_to":
        new_bill_to = Ship_to(
            name=data["name"],
            address1=data["address1"],
            address2=data["address2"],
        )

    db.session.add(new_bill_to)
    db.session.commit()

    return "Invoice created successfully"


@app.route("/edit/type/<type>/<int:bill_to_id>", methods=["PUT"])
def edit_bill_to_view(type, bill_to_id):
    data = request.json
    if type == "ship_from":
        bill_to = Ship_from.query.get(bill_to_id)
    elif type == "bill_to":
        bill_to = Bill_to.query.get(bill_to_id)
    elif type == "ship_to":
        bill_to = Ship_to.query.get(bill_to_id)

    if not bill_to:
        return jsonify({"error": "Bill_to not found"}), 404

    bill_to.name = data.get("name", bill_to.name)
    bill_to.address1 = data.get("address1", bill_to.address1)
    bill_to.address2 = data.get("address2", bill_to.address2)

    db.session.commit()

    return "Bill_to updated successfully"


@app.route("/get/type/<type>/<int:bill_to_id>")
def get_bill_to_one_view(type, bill_to_id):
    if type == "ship_from":
        bill_to = Ship_from.query.get(bill_to_id)
    elif type == "bill_to":
        bill_to = Bill_to.query.get(bill_to_id)
    elif type == "ship_to":
        bill_to = Ship_to.query.get(bill_to_id)

    
    bill_to_object = {}
    bill_to_object["id"] = bill_to.id
    bill_to_object["name"] = bill_to.name
    bill_to_object["address1"] = bill_to.address1
    bill_to_object["address2"] = bill_to.address2

    return jsonify(bill_to_object)
