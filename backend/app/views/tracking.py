

from flask import jsonify, redirect, request
from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_to, Ship_to


@app.route("/get/one_invoice_bl", methods=['POST'])
def get_one_invoice_bl_view():
    bl_number = request.form.get('bl_number')
    invoice = Invoice.query.filter_by(bl_number=bl_number).first()
    invoice_object = {}
    invoice_object["id"] = invoice.id 
    invoice_object["bill_to"] = invoice.bill_to.name
    invoice_object["ship_from"] = invoice.ship_from.name
    invoice_object["ship_to"] = invoice.ship_to.name
    invoice_object["bl_number"] = invoice.bl_number 

    return jsonify(invoice_object)