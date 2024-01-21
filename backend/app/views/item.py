import json
from flask import jsonify, redirect, request
from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Item, Item, Vendor


@app.route("/get/item")
def get_item_view():
    all_bills = []
    all_bills_raw = Item.query.order_by(Item.id).all()
    for item in all_bills_raw:
        if item.deleted == "True":
            continue
        item_object = {}
        item_object["id"] = item.id
        item_object["name"] = item.name
        item_object["description"] = item.description
        item_object["price"] = item.price
        item_object["vendor_cost"] = item.vendor_cost
        item_object["currency"] = item.currency
        item_object["quantity"] = item.quantity
        item_object["vendor_id"] = item.vendor_id

        all_bills.append(item_object)

    return jsonify(all_bills)


@app.route("/edit/item/<int:item_id>", methods=["PUT"])
def edit_item_view(item_id):
    data = request.json
    item = Item.query.get(item_id)

    if not item:
        return jsonify({"error": "Item not found"}), 404

    item.name = data.get("name", item.name)
    item.description = data.get("description", item.description)
    item.price = data.get("price", item.price)
    item.vendor_cost = data.get("vendor_cost", item.vendor_cost)
    item.quantity = data.get("quantity", item.quantity)
    item.currency = data.get("currency", item.currency)
    if data["vendor_id"] == "Select Vendor":
        item.vendor_id = None
    else:
        item.vendor_id = data.get("vendor_id", item.vendor_id)

    db.session.commit()

    return "Item updated successfully"


@app.route("/get/item/<int:item_id>")
def get_item_one_view(item_id):
    item = Item.query.get(item_id)

    if not item:
        return jsonify({"error": "Item not found"}), 404

    item_object = {
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "vendor_cost": item.vendor_cost,
        "quantity": item.quantity,
        "currency": item.currency,
        "vendor_id": item.vendor_id,
    }

    return jsonify(item_object)


@app.route("/create/item", methods=["POST"])
def create_item_view():
    data = request.json

    if data.get("vendor_id") == "Select Vendor":
        vendor_id = None
    else:
        vendor_id = data.get("vendor_id", None)
    new_item = Item(
        name=data.get("name", ""),
        description=data.get("description", ""),
        price=data.get("price", 0),
        vendor_cost=data.get("vendor_cost", 0),
        currency=data.get("currency", "USD"),
        quantity=data.get("quantity", 1),
        vendor_id=vendor_id,
    )

    db.session.add(new_item)
    db.session.commit()

    return "Invoice created successfully"


@app.route("/delete/item/<int:item_id>", methods=["DELETE"])
def delete_item_view(item_id):
    item = Item.query.get(item_id)
    item.deleted = "True"
    db.session.commit()

    return "Bill_to deleted successfully"
