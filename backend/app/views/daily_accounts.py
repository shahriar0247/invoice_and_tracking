import json

from flask import jsonify, redirect, request, send_file
import pandas as pd
import os
import uuid
from app import app, db
from app.models.modals import (
    Bill_to,
    Company,
    Daily_Account,
    Invoice,
    Purchase_Order,
    Ship_from,
    Ship_to,
    Vendor,
)


@app.route("/get/daily_account")
def get_daily_account_view():
    all_daily_account = []
    all_daily_accounts_raw = Daily_Account.query.all()
    for daily_account in all_daily_accounts_raw:
        daily_account_object = {}
        daily_account_object["id"] = daily_account.id
        daily_account_object["all_items"] = daily_account.all_items
        daily_account_object["description"] = daily_account.description
        daily_account_object["currency"] = daily_account.currency
        daily_account_object["date"] = daily_account.date
        daily_account_object["vendor_id"] = 0
        daily_account_object["bill_to_id"] = 0
     
        bill_to_object = {}
        if (daily_account.bill_to_id and daily_account.bill_to_id !=0):
            bill_to = Bill_to.query.get(
                daily_account.bill_to_id
            )
            if bill_to:
                bill_to_object["id"] = bill_to.id
                bill_to_object["name"] = bill_to.name
                daily_account_object["bill_to_id"] = bill_to.id
            else:
                bill_to_object["id"] = ""
                bill_to_object["name"] = ""
                daily_account_object["bill_to_id"] = ""


        vendor_object = {}
    
        if (daily_account.vendor_id and daily_account.vendor_id !=0):
            vendor = Vendor.query.get(daily_account.vendor_id)
            if vendor:
                vendor_object["id"] = vendor.id
                vendor_object["name"] = vendor.name
                daily_account_object["vendor_id"] = vendor.id
            else:
                vendor_object["id"] = ""
                vendor_object["name"] = ""
                daily_account_object["vendor_id"] = ""


        daily_account_object["vendor"] = vendor_object
        daily_account_object["bill_to"] = bill_to_object

        all_daily_account.append(daily_account_object)

    return jsonify(all_daily_account)

@app.route("/create/daily_account/<daily_account_id>", methods=["POST"])
def create_daily_account_view(daily_account_id):
    data = request.json

    invoice = Daily_Account.query.get(daily_account_id)

    if invoice and data["edit"]:
        invoice.bill_to_id = data.get("bill_to_id", invoice.bill_to_id)
        invoice.vendor_id = data.get("vendor_id", invoice.vendor_id)
        invoice.date = data.get("date", invoice.date)
        invoice.currency = data.get("currency", invoice.currency)
        invoice.description = data.get("description", invoice.description)
        invoice.all_items = json.dumps(
            data.get("all_items", json.loads(invoice.all_items))
        )

        db.session.commit()

        return "Invoice updated successfully"

    new_invoice = Daily_Account(
        id=(data["id"]),
        vendor_id=data['vendor_id'],
        bill_to_id=data['bill_to_id'],
        date=data['date'],
        currency=data['currency'],
        description=data['description'],
        all_items=json.dumps(data["all_items"]),
    )

    db.session.add(new_invoice)
    db.session.commit()

    return "Invoice created successfully"

@app.route("/delete/daily_account/<invoice_id>", methods=["DELETE"])
def delete_daily_account(invoice_id):
    invoice = Daily_Account.query.get(invoice_id)

    if invoice:
        db.session.delete(invoice)
        db.session.commit()
        return "Daily_Account deleted successfully"

    return "Daily_Account not found", 404



@app.route("/edit/daily_account/<int:daily_account_id>", methods=["PUT"])
def edit_daily_account(daily_account_id):
    daily_account = Invoice.query.get(daily_account_id)

    if not daily_account:
        return "Invoice not found", 404

    # Parse request data to update the daily_account
    data = request.json  # Assuming you receive JSON data from the request
    daily_account.date = data["date"]
    daily_account.terms = data["terms"]
    daily_account.bill_to1 = data["bill_to1"]
    daily_account.bill_to2 = data["bill_to2"]
    daily_account.bill_to3 = data["bill_to3"]
    daily_account.ship_from1 = data["ship_from1"]
    daily_account.ship_from2 = data["ship_from2"]
    daily_account.ship_from3 = data["ship_from3"]
    daily_account.company_name = data["company_name"]

    db.session.commit()

    return "Invoice updated successfully"

@app.route("/get_daily_account_details/<daily_account_number>")
def get_daily_account_details_view_(daily_account_number):
    daily_account = Daily_Account.query.get(daily_account_number)
    daily_account_object = {}
    daily_account_object["id"] = daily_account.id
    daily_account_object["all_items"] = daily_account.all_items
    daily_account_object["description"] = daily_account.description
    daily_account_object["currency"] = daily_account.currency
    daily_account_object["date"] = daily_account.date
    daily_account_object["vendor_id"] = 0
    daily_account_object["bill_to_id"] = 0


  
    bill_to_object = {}
    if (daily_account.bill_to_id and daily_account.bill_to_id !=0):
        bill_to = Bill_to.query.get(
            daily_account.bill_to_id
        )
        bill_to_object["id"] = bill_to.id
        bill_to_object["name"] = bill_to.name
        bill_to_object["address1"] = bill_to.address1
        bill_to_object["address2"] = bill_to.address2
        daily_account_object["bill_to_id"] = bill_to.id



    vendor_object = {}

    if (daily_account.vendor_id and daily_account.vendor_id !=0):

        vendor = Vendor.query.get(daily_account.vendor_id)
        vendor_object["id"] = vendor.id
        vendor_object["name"] = vendor.name
        vendor_object["address1"] = vendor.address1
        vendor_object["address2"] = vendor.address2
        daily_account_object["vendor_id"] = vendor.id

    daily_account_object["vendor"] = vendor_object
    daily_account_object["bill_to"] = bill_to_object


    return jsonify(daily_account_object)

@app.route('/daily_accounts/download', methods=['POST'])
def download_excel():
    data = request.json
    df = pd.DataFrame(data[1:], columns=data[0])
    random_filename = f"output_excel_{uuid.uuid4().hex}.xlsx"
    excel_file_path = os.path.join("/home/ahmedshahriar0247/invoice_and_tracking/backend/", random_filename)
    df.to_excel(excel_file_path, index=False, engine='openpyxl')
    response = send_file(excel_file_path, as_attachment=True)
    os.remove(excel_file_path)
    return response
