

import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_from, Ship_to

@app.route("/ship_from")
def ship_from_view():
    return render_template("ship_from.html")


@app.route("/get/ship_from")
def get_ship_from_view():
    all_bills = []
    all_bills_raw = Ship_from.query.all()
    for ship_from in all_bills_raw:
        ship_from_object = {}
        ship_from_object["name"] = ship_from.name 
        ship_from_object["address1"] = ship_from.address1 
        ship_from_object["address2"] = ship_from.address2 

        all_bills.append(ship_from_object)

    return jsonify(all_bills)


@app.route("/create/ship_from", methods=["POST"])
def create_ship_from_view():

    data = request.json  
    new_ship_from = Ship_from(
        name=data["name"],
        address1=data["address1"],
        address2=data["address2"],
    )

    db.session.add(new_ship_from)
    db.session.commit()
    
    return "Invoice created successfully"