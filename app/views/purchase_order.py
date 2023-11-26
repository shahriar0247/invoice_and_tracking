
import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.modals import Vendor, Company, Purchase_Order, Ship_from, Ship_to

    
@app.route("/create_purchase_order")
def create_purchase_order_view_():
    return render_template("create_purchase_order.html")

    
    
@app.route("/purchase_orders")
def purchase_orders_view():
    return render_template("purchase_orders.html")

@app.route("/get/purchase_order")
def get_purchase_order_view():

    all_purchase_order = []
    all_purchase_orders_raw = Purchase_Order.query.all()
    print(all_purchase_orders_raw)
    for purchase_order in all_purchase_orders_raw:
        purchase_order_object = {}
        purchase_order_object["id"] = purchase_order.id 
        purchase_order_object["vendor"] = Vendor.query.get(purchase_order.vendor_id).name
        purchase_order_object["bl_number"] = purchase_order.bl_number
        print(purchase_order_object)

        all_purchase_order.append(purchase_order_object)

    return jsonify(all_purchase_order)

@app.route("/create/purchase_order", methods=["POST"])
def create_purchase_order_view():
    data = request.json  
    new_purchase_order = Purchase_Order(
        vendor_id=(data["vendor_id"]),
        date=data["date"],
        terms=data["terms"],
        extra_info=data["extra_info"],
        bank_details=data["bank_details"],
        bl_number=data["bl_number"],
        type=data["type"],
        all_items = json.dumps(data["all_items"])
    )

    db.session.add(new_purchase_order)
    db.session.commit()
    
    return "Purchase_Order created successfully"


@app.route("/delete/purchase_order/<int:purchase_order_id>", methods=["DELETE"])
def delete_purchase_order(purchase_order_id):
    purchase_order = Purchase_Order.query.get(purchase_order_id)
    
    if purchase_order:
        db.session.delete(purchase_order)
        db.session.commit()
        return "Purchase_Order deleted successfully"
    
    return "Purchase_Order not found", 404
 
    
@app.route("/edit/purchase_order/<int:purchase_order_id>", methods=["PUT"])
def edit_purchase_order(purchase_order_id):
    purchase_order = Purchase_Order.query.get(purchase_order_id)
    
    if not purchase_order:
        return "Purchase_Order not found", 404

    # Parse request data to update the purchase_order
    data = request.json  # Assuming you receive JSON data from the request
    purchase_order.date = data["date"]
    purchase_order.terms = data["terms"]
    purchase_order.bill_to1 = data["bill_to1"]
    purchase_order.bill_to2 = data["bill_to2"]
    purchase_order.bill_to3 = data["bill_to3"]
    purchase_order.ship_from1 = data["ship_from1"]
    purchase_order.ship_from2 = data["ship_from2"]
    purchase_order.ship_from3 = data["ship_from3"]
    purchase_order.company_name = data["company_name"]

    db.session.commit()
    
    return "Purchase_Order updated successfully"

@app.route("/view_purchase_order/<purchase_order_number>")
def view_purchase_order_view_(purchase_order_number):
    return render_template("view_purchase_order.html")

@app.route("/get_purchase_order_details/<purchase_order_number>")
def get_purchase_order_details_view_(purchase_order_number):
    purchase_order = Purchase_Order.query.get(purchase_order_number)
    purchase_order_object = {}
    purchase_order_object["id"] = purchase_order.id 
    purchase_order_object["vendor"] = purchase_order.vendor
    purchase_order_object["bl_number"] = purchase_order.bl_number
    purchase_order_object["date"] = purchase_order.date
    purchase_order_object["type"] = purchase_order.type
    purchase_order_object["terms"] = purchase_order.terms
    purchase_order_object["extra_info"] = purchase_order.extra_info
    purchase_order_object["all_items"] = purchase_order.all_items
    purchase_order_object["bank_details"] = purchase_order.bank_details

    return jsonify(purchase_order_object)