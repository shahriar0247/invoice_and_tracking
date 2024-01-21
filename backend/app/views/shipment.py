import json

from flask import jsonify, redirect, request

from app import app, db
from app.models.modals import Bill_to, Purchase_Order, Shipment, Ship_from, Ship_to


@app.route("/get/shipment")
def get_shipment_view():
    all_shipment = []
    all_shipments_raw = Shipment.query.order_by(Shipment.id).all()
    for shipment in all_shipments_raw:
        if shipment.deleted == "True": continue
        shipment_object = {}
        shipment_object["id"] = shipment.id
        try:
            shipment_object["issued_to"] = Bill_to.query.get(shipment.issued_to_id).name
        except:
            pass
            
        try:
            shipment_object["ship_from"] = Ship_from.query.get(shipment.ship_from_id).name
        except:
            pass
        
        try:
            shipment_object["ship_to"] = Ship_to.query.get(shipment.ship_to_id).name
        except:
            pass
        
        shipment_object["bl_number"] = shipment.bl_number
        shipment_object["type"] = shipment.type
        shipment_object["arrival_date"] = shipment.arrival_date
        shipment_object["due_date"] = shipment.due_date
        shipment_object["weight"] = shipment.weight
        shipment_object["description"] = shipment.description
        shipment_object["shipment_status"] = shipment.shipment_status
        shipment_object["all_items"] = shipment.all_items

        all_shipment.append(shipment_object)

    return jsonify(all_shipment)


@app.route("/create/shipment/<shipment_id>", methods=["POST"])
def create_shipment_view(shipment_id):
    data = request.json

    shipment = Shipment.query.get(shipment_id)

    if shipment and data["edit"]:
        shipment.issued_to_id = data.get("issued_to_id", shipment.issued_to_id)
        shipment.ship_from_id = data.get("ship_from_id", shipment.ship_from_id)
        shipment.ship_to_id = data.get("ship_to_id", shipment.ship_to_id)
        shipment.invoice_id = data.get("invoice_id", shipment.invoice_id)
        shipment.arrival_date = data.get("arrival_date", shipment.arrival_date)
        shipment.weight = data.get("weight", shipment.weight)
        shipment.due_date = data.get("due_date", shipment.due_date)
        shipment.terms = data.get("terms", shipment.terms)
        shipment.container_number = data.get("container_number", shipment.container_number)
        shipment.shipping_details = data.get("shipping_details", shipment.shipping_details)
        shipment.bl_number = data.get("bl_number", shipment.bl_number)
        shipment.type = data.get("type", shipment.type)
        shipment.description = data.get("description", shipment.description)
        shipment.shipment_status = data.get("shipment_status", shipment.shipment_status)

        shipment.all_items = json.dumps(
            data.get("all_items", json.loads(shipment.all_items))
        )

        db.session.commit()

        return "Shipment updated successfully"

    new_shipment = Shipment(
        id=(data["id"]),
        issued_to_id=(data["issued_to_id"]),
        ship_from_id=data["ship_from_id"],
        ship_to_id=(data["ship_to_id"]),
        invoice_id=(data["invoice_id"]),
        arrival_date=data["arrival_date"],
        weight=data["weight"],
        due_date=data["due_date"],
        terms=data["terms"],
        container_number=data["container_number"],
        shipping_details=data["shipping_details"],
        bl_number=data["bl_number"],
        type=data["type"],
        description=data["description"],
        shipment_status=data["shipment_status"],
        all_items=json.dumps(data["all_items"]),
    )

    db.session.add(new_shipment)
    db.session.commit()
    return "Shipment created successfully"


@app.route("/delete/shipment/<shipment_id>", methods=["DELETE"])
def delete_shipment(shipment_id):
    shipment = Shipment.query.get(shipment_id)

    if shipment:
        db.session.delete(shipment)
        db.session.commit()
        return "Shipment deleted successfully"

    return "Shipment not found", 404



@app.route("/get_shipment_details/<shipment_number>")
def get_shipment_details_view_(shipment_number):
    shipment = Shipment.query.get(shipment_number)
    shipment_object = {}
    shipment_object["id"] = shipment.id
    issued_to = Bill_to.query.get(shipment.issued_to_id)
    issued_to_object = {}
    issued_to_object["id"] = issued_to.id
    issued_to_object["name"] = issued_to.name
    issued_to_object["address1"] = issued_to.address1
    issued_to_object["address2"] = issued_to.address2
    shipment_object["issued_to"] = issued_to_object

    ship_from = Ship_from.query.get(shipment.ship_from_id)
    ship_from_object = {}
    ship_from_object["id"] = ship_from.id
    ship_from_object["name"] = ship_from.name
    ship_from_object["address1"] = ship_from.address1
    ship_from_object["address2"] = ship_from.address2
    shipment_object["ship_from"] = ship_from_object

    ship_to = Ship_to.query.get(shipment.ship_to_id)
    ship_to_object = {}
    ship_to_object["id"] = ship_to.id
    ship_to_object["name"] = ship_to.name
    ship_to_object["address1"] = ship_to.address1
    ship_to_object["address2"] = ship_to.address2
    shipment_object["ship_to"] = ship_to_object

    shipment_object["bl_number"] = shipment.bl_number
    shipment_object["arrival_date"] = shipment.arrival_date
    shipment_object["due_date"] = shipment.due_date
    shipment_object["type"] = shipment.type
    shipment_object["invoice_id"] = shipment.invoice_id
    shipment_object["terms"] = shipment.terms
    shipment_object["weight"] = shipment.weight
    shipment_object["container_number"] = shipment.container_number
    shipment_object["all_items"] = shipment.all_items
    shipment_object["shipping_details"] = shipment.shipping_details
    
    shipment_object["shipment_status"] = shipment.shipment_status
    shipment_object["description"] = shipment.description

    return jsonify(shipment_object)


@app.route("/get_shipment_details_for_daily_accounts/<shipment_number>")
def get_shipment_details_for_daily_accounts_view(shipment_number):
    shipment = Shipment.query.get(shipment_number)
    shipment_object = {}
    shipment_object["id"] = shipment.id
    shipment_object["issued_to"] = Bill_to.query.get(shipment.issued_to_id).name
    shipment_object["ship_from"] = Ship_from.query.get(shipment.ship_from_id).name
    shipment_object["ship_to"] = Ship_to.query.get(shipment.ship_to_id).name
    shipment_object["bl_number"] = shipment.bl_number
    shipment_object["invoice_id"] = shipment.invoice_id
    shipment_object["arrival_date"] = shipment.arrival_date
    shipment_object["type"] = shipment.type
    shipment_object["terms"] = shipment.terms
    shipment_object["container_number"] = shipment.container_number
    shipment_object["weight"] = shipment.weight
    shipment_object["all_items"] = shipment.all_items
    shipment_object["shipping_details"] = shipment.shipping_details
    shipment_object["description"] = shipment.description
    shipment_object["shipment_status"] = shipment.shipment_status

    return jsonify(shipment_object)

@app.route("/shipment/change_status", methods=["POST"])
def update_shipment_status():
    shipment = Shipment.query.get(request.json.get("id"))

    if not shipment:
        return "Shipment not found", 404

    # Parse request data to update the shipment
    data = request.json  # Assuming you receive JSON data from the request
    shipment.shipment_status = data["status"]

    db.session.commit()

    return "Shipment status updated successfully to " + data['status']

