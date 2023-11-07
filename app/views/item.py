

import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Item, Item

@app.route("/item")
def item_view():
    return render_template("item.html")


@app.route("/get/item")
def get_item_view():
    all_bills = []
    all_bills_raw = Item.query.all()
    for item in all_bills_raw:
        item_object = {}
        print(item.description)
        item_object["name"] = item.name 
        item_object["description"] = item.description 
        item_object["price"] = item.price 

        all_bills.append(item_object)

    return jsonify(all_bills)


@app.route("/create/item", methods=["POST"])
def create_item_view():

    data = request.json  
    new_item = Item(
        name=data["name"],
        description=data["description"],
        price=data["price"],
    )

    db.session.add(new_item)
    db.session.commit()
    
    return "Invoice created successfully"