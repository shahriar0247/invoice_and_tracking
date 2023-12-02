
import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_from, Ship_to


    
@app.route("/create_daily_account")
def create_daily_account_view_():
    return render_template("create_daily_account.html")

    
    
@app.route("/daily_accounts")
def daily_accounts_view():
    return render_template("daily_accounts.html")

@app.route("/get/daily_account")
def get_daily_account_view():

    all_daily_account = []
    all_daily_accounts_raw = Invoice.query.all()
    print(all_daily_accounts_raw)
    for daily_account in all_daily_accounts_raw:
        daily_account_object = {}
        daily_account_object["id"] = daily_account.id 
        daily_account_object["bill_to"] = Bill_to.query.get(daily_account.bill_to_id).name
        daily_account_object["ship_from"] = Ship_from.query.get(daily_account.ship_from_id).name
        daily_account_object["ship_to"] = Ship_to.query.get(daily_account.ship_to_id).name
        daily_account_object["bl_number"] = daily_account.bl_number
        daily_account_object["date"] = daily_account.date
        print(daily_account_object)

        all_daily_account.append(daily_account_object)

    return jsonify(all_daily_account)

@app.route("/create/daily_account", methods=["POST"])
def create_daily_account_view():
    data = request.json  
    new_daily_account = Invoice(
        bill_to_id=(data["bill_to_id"]),
        ship_from_id=data["ship_from_id"],
        ship_to_id=(data["ship_to_id"]),
        date=data["date"],
        terms=data["terms"],
        extra_info=data["extra_info"],
        bank_details=data["bank_details"],
        bl_number=data["bl_number"],
        type=data["type"],
        all_items = json.dumps(data["all_items"])
    )

    db.session.add(new_daily_account)
    db.session.commit()
    
    return "Invoice created successfully"


@app.route("/delete/daily_account/<int:daily_account_id>", methods=["DELETE"])
def delete_daily_account(daily_account_id):
    daily_account = Invoice.query.get(daily_account_id)
    
    if daily_account:
        db.session.delete(daily_account)
        db.session.commit()
        return "Invoice deleted successfully"
    
    return "Invoice not found", 404
 
    
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

@app.route("/view_daily_account/<daily_account_number>")
def view_daily_account_view_(daily_account_number):
    return render_template("view_daily_account.html")

@app.route("/get_daily_account_details/<daily_account_number>")
def get_daily_account_details_view_(daily_account_number):
    daily_account = Invoice.query.get(daily_account_number)
    daily_account_object = {}
    daily_account_object["id"] = daily_account.id 
    daily_account_object["bill_to"] = daily_account.bill_to_id
    daily_account_object["ship_from"] = daily_account.ship_from_id
    daily_account_object["ship_to"] = daily_account.ship_to_id
    daily_account_object["bl_number"] = daily_account.bl_number
    daily_account_object["date"] = daily_account.date
    daily_account_object["type"] = daily_account.type
    daily_account_object["terms"] = daily_account.terms
    daily_account_object["extra_info"] = daily_account.extra_info
    daily_account_object["all_items"] = daily_account.all_items
    daily_account_object["bank_details"] = daily_account.bank_details

    return jsonify(daily_account_object)