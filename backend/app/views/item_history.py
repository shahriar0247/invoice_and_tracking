import json

from flask import jsonify, redirect, request

from app import app, db
from app.models.modals import Vendor, ItemHistory, ItemHistory, Invoice, Ship_to


@app.route("/get/item_history")
def get_item_history_view():
    all_item_history = []
    all_item_history_raw = ItemHistory.query.order_by(ItemHistory.id).all()
    for item_history in all_item_history_raw:
        if item_history.deleted == "True": continue
        item_history_object = {}
        item_history_object["id"] = item_history.id
        item_history_object["description"] = item_history.description
        item_history_object["date"] = item_history.date
        item_history_object["all_items"] = item_history.all_items

        all_item_history.append(item_history_object)

    return jsonify(all_item_history)


@app.route("/create/item_history/<item_history_id>", methods=["POST"])
def create_item_history_view(item_history_id):
    data = request.json

    item_history = ItemHistory.query.get(item_history_id)

    if item_history and data["edit"]:
        item_history.description = data.get("description", item_history.description)
        item_history.date = data.get("date", item_history.date)

        item_history.all_items = json.dumps(
            data.get("all_items", json.loads(item_history.all_items))
        )

        db.session.commit()

        return "ItemHistory updated successfully"

    new_item_history = ItemHistory(
        id=(data["id"]),
        description=data["description"],
        date=data["date"],
        all_items=json.dumps(data["all_items"]),
    )

    db.session.add(new_item_history)
    db.session.commit()

    return "ItemHistory created successfully"


@app.route("/delete/item_history/<item_history_id>", methods=["DELETE"])
def delete_item_history(item_history_id):
    item_history = ItemHistory.query.get(item_history_id)

    if item_history:
        db.session.delete(item_history)
        db.session.commit()
        return "ItemHistory deleted successfully"

    return "ItemHistory not found", 404


@app.route("/get_item_history_details/<item_history_number>")
def get_item_history_details_view_(item_history_number):
    item_history = ItemHistory.query.get(item_history_number)
    item_history_object = {}
    item_history_object["id"] = item_history.id
    
  

    item_history_object["date"] = item_history.date
    item_history_object["all_items"] = item_history.all_items
    item_history_object["description"] = item_history.description

    return jsonify(item_history_object)


@app.route("/get_item_history_details_for_daily_accounts/<item_history_number>")
def get_item_history_details_for_daily_accounts_view(item_history_number):
    item_history = ItemHistory.query.get(item_history_number)
    item_history_object = {}
    item_history_object["id"] = item_history.id
    item_history_object["date"] = item_history.date
    item_history_object["all_items"] = item_history.all_items
    item_history_object["description"] = item_history.description

    return jsonify(item_history_object)

@app.route("/item_history/change_status", methods=["POST"])
def update_item_history_status():
    item_history = ItemHistory.query.get(request.json.get("id"))

    if not item_history:
        return "ItemHistory not found", 404

    # Parse request data to update the item_history
    data = request.json  # Assuming you receive JSON data from the request
    item_history.item_history_status = data["status"]

    db.session.commit()

    return "ItemHistory status updated successfully to " + data['status']

