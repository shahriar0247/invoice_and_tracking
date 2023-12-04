

import json

from flask import jsonify, redirect, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Vendor



@app.route("/get/vendor")
def get_vendor_view():
    all_bills = []
    all_bills_raw = Vendor.query.all()
    for vendor in all_bills_raw:
        vendor_object = {}
        vendor_object["id"] = vendor.id 
        vendor_object["name"] = vendor.name 
        vendor_object["address1"] = vendor.address1 
        vendor_object["address2"] = vendor.address2 

        all_bills.append(vendor_object)

    return jsonify(all_bills)


@app.route("/create/vendor", methods=["POST"])
def create_vendor_view():

    data = request.json  
    new_vendor = Vendor(
        name=data["name"],
        address1=data["address1"],
        address2=data["address2"],
    )

    db.session.add(new_vendor)
    db.session.commit()
    
    return "Invoice created successfully"