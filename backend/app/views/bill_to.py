import json

from flask import jsonify, redirect, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_from, Ship_to, Vendor


@app.route("/get/type/<type>")
def get_items_view(type):
    all_bills = []
    if type == "ship_from":
        all_bills_raw = Ship_from.query.all()
    elif type == "item":
        all_bills_raw = Bill_to.query.all()
    elif type == "ship_to":
        all_bills_raw = Ship_to.query.all()
    elif type == "vendor":
        all_bills_raw = Vendor.query.all()
    for item in all_bills_raw:
        if item.deleted == "True": continue
        item_object = {}
        item_object["id"] = item.id
        item_object["name"] = item.name
        item_object["address1"] = item.address1
        item_object["address2"] = item.address2

        all_bills.append(item_object)

    return jsonify(all_bills)


@app.route("/create/type/<type>", methods=["POST"])
def create_items_view(type):
    data = request.json
    if type == "ship_from":
        new_item = Ship_from(
            name=data["name"],
            address1=data["address1"],
            address2=data["address2"],
        )
    elif type == "item":
        new_item = Bill_to(
            name=data["name"],
            address1=data["address1"],
            address2=data["address2"],
        )
    elif type == "ship_to":
        new_item = Ship_to(
            name=data["name"],
            address1=data["address1"],
            address2=data["address2"],
        )
    elif type == "vendor":
        new_item = Vendor(
            name=data["name"],
            address1=data["address1"],
            address2=data["address2"],
        )
        

    db.session.add(new_item)
    db.session.commit()

    return "Invoice created successfully"


@app.route("/edit/type/<type>/<int:item_id>", methods=["PUT"])
def edit_items_view(type, item_id):
    data = request.json
    if type == "ship_from":
        item = Ship_from.query.get(item_id)
    elif type == "item":
        item = Bill_to.query.get(item_id)
    elif type == "ship_to":
        item = Ship_to.query.get(item_id)
    elif type == "vendor":
        item = Vendor.query.get(item_id)

    if not item:
        return jsonify({"error": "Bill_to not found"}), 404

    item.name = data.get("name", item.name)
    item.address1 = data.get("address1", item.address1)
    item.address2 = data.get("address2", item.address2)

    db.session.commit()

    return "Bill_to updated successfully"


@app.route("/get/type/<type>/<int:item_id>")
def get_items_one_view(type, item_id):
    if type == "ship_from":
        item = Ship_from.query.get(item_id)
    elif type == "item":
        item = Bill_to.query.get(item_id)
    elif type == "ship_to":
        item = Ship_to.query.get(item_id)
    elif type == "vendor":
        item = Vendor.query.get(item_id)
    
    item_object = {}
    item_object["id"] = item.id
    item_object["name"] = item.name
    item_object["address1"] = item.address1
    item_object["address2"] = item.address2

    return jsonify(item_object)

# ... (previous backend code)

@app.route("/delete/type/<type>/<int:item_id>", methods=["DELETE"])
def delete_items_view(type, item_id):
    if type == "ship_from":
        item = Ship_from.query.get(item_id)
    elif type == "item":
        item = Bill_to.query.get(item_id)
    elif type == "ship_to":
        item = Ship_to.query.get(item_id)
    elif type == "vendor":
        item = Vendor.query.get(item_id)
    if not item:
        return jsonify({"error": "Bill_to not found"}), 404

    try:
        item.deleted = "True"
        db.session.delete(item)
        db.session.commit()
    except Exception as e:
        return str(e)

    return "Bill_to deleted successfully"
