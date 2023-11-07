

import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_to, Ship_to

@app.route("/ship_to")
def ship_to_view():
    return render_template("ship_to.html")


@app.route("/get/ship_to")
def get_ship_to_view():
    all_bills = []
    all_bills_raw = Ship_to.query.all()
    for ship_to in all_bills_raw:
        ship_to_object = {}
        ship_to_object["name"] = ship_to.name 
        ship_to_object["address1"] = ship_to.address1 
        ship_to_object["address2"] = ship_to.address2 

        all_bills.append(ship_to_object)

    return jsonify(all_bills)


@app.route("/create/ship_to", methods=["POST"])
def create_ship_to_view():

    data = request.json  
    new_ship_to = Ship_to(
        name=data["name"],
        address1=data["address1"],
        address2=data["address2"],
    )

    db.session.add(new_ship_to)
    db.session.commit()
    
    return "Invoice created successfully"