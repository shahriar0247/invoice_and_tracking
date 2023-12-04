import json

from flask import jsonify, redirect, request

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

        purchase_order = Purchase_Order.query.get(
            daily_account.purchase_order_id
        )
        purchase_order_object = {}
        purchase_order_object["id"] = purchase_order.id
        purchase_order_object["invoice_id"] = purchase_order.id
        purchase_order_object["vendor"] = Vendor.query.get(
            purchase_order.vendor_id
        ).name
        purchase_order_object["bl_number"] = purchase_order.bl_number
        purchase_order_object["date"] = purchase_order.date

        invoice = Invoice.query.get(purchase_order.invoice_id)
        invoice_object = {}
        invoice_object["id"] = invoice.id
        invoice_object["bill_to"] = Bill_to.query.get(invoice.bill_to_id).name
        invoice_object["ship_from"] = Ship_from.query.get(invoice.ship_from_id).name
        invoice_object["ship_to"] = Ship_to.query.get(invoice.ship_to_id).name
        invoice_object["bl_number"] = invoice.bl_number
        invoice_object["date"] = invoice.date

        daily_account_object["invoice"] = invoice_object
        daily_account_object["purchase_order"] = purchase_order_object

        daily_account_object["invoice_id"] = invoice.id
        daily_account_object["purchase_order_id"] = purchase_order.id

        all_daily_account.append(daily_account_object)

    return jsonify(all_daily_account)


@app.route("/create/daily_account", methods=["POST"])
def create_daily_account_view():
    data = request.json
    new_daily_account = Daily_Account(all_items=json.dumps(data["all_items"]), purchase_order_id=data["purchase_order_id"])

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

@app.route("/get_daily_account_details/<daily_account_number>")
def get_daily_account_details_view_(daily_account_number):
    daily_account = Daily_Account.query.get(daily_account_number)
    daily_account_object = {}
    daily_account_object["id"] = daily_account.id
    daily_account_object["all_items"] = daily_account.all_items

    purchase_order = Purchase_Order.query.get(
        daily_account.purchase_order_id
    )
    purchase_order_object = {}
    purchase_order_object["id"] = purchase_order.id
    purchase_order_object["invoice_id"] = purchase_order.id
    purchase_order_object["vendor"] = Vendor.query.get(
        purchase_order.vendor_id
    ).name
    purchase_order_object["bl_number"] = purchase_order.bl_number
    purchase_order_object["date"] = purchase_order.date
    purchase_order_object["all_items"] = purchase_order.all_items

    invoice = Invoice.query.get(purchase_order.invoice_id)
    invoice_object = {}
    invoice_object["id"] = invoice.id
    invoice_object["bill_to"] = Bill_to.query.get(invoice.bill_to_id).name
    invoice_object["ship_from"] = Ship_from.query.get(invoice.ship_from_id).name
    invoice_object["ship_to"] = Ship_to.query.get(invoice.ship_to_id).name
    invoice_object["bl_number"] = invoice.bl_number
    invoice_object["date"] = invoice.date
    invoice_object["all_items"] = invoice.all_items

    daily_account_object["invoice"] = invoice_object
    daily_account_object["purchase_order"] = purchase_order_object

    daily_account_object["invoice_id"] = invoice.id
    daily_account_object["purchase_order_id"] = purchase_order.id

    return jsonify(daily_account_object)
