
import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_from, Ship_to

@app.route("/")
def home():
    return redirect("/create_invoice")

    
@app.route("/create_invoice")
def create_invoice_view_():
    return render_template("create_invoice.html")

    
    
@app.route("/invoices")
def invoices_view():
    return render_template("invoices.html")

@app.route("/get/invoice")
def get_invoice_view():

    all_invoice = []
    all_invoices_raw = Invoice.query.all()
    print(all_invoices_raw)
    for invoice in all_invoices_raw:
        invoice_object = {}
        invoice_object["id"] = invoice.id 
        invoice_object["bill_to"] = Bill_to.query.get(invoice.bill_to_id).name
        invoice_object["ship_from"] = Ship_from.query.get(invoice.ship_from_id).name
        invoice_object["ship_to"] = Ship_to.query.get(invoice.ship_to_id).name
        invoice_object["bl_number"] = invoice.bl_number
        print(invoice_object)

        all_invoice.append(invoice_object)

    return jsonify(all_invoice)

@app.route("/create/invoice", methods=["POST"])
def create_invoice_view():
    data = request.json  
    new_invoice = Invoice(
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

    db.session.add(new_invoice)
    db.session.commit()
    
    return "Invoice created successfully"


@app.route("/delete/invoice/<int:invoice_id>", methods=["DELETE"])
def delete_invoice(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    
    if invoice:
        db.session.delete(invoice)
        db.session.commit()
        return "Invoice deleted successfully"
    
    return "Invoice not found", 404
 
    
@app.route("/edit/invoice/<int:invoice_id>", methods=["PUT"])
def edit_invoice(invoice_id):
    invoice = Invoice.query.get(invoice_id)
    
    if not invoice:
        return "Invoice not found", 404

    # Parse request data to update the invoice
    data = request.json  # Assuming you receive JSON data from the request
    invoice.date = data["date"]
    invoice.terms = data["terms"]
    invoice.bill_to1 = data["bill_to1"]
    invoice.bill_to2 = data["bill_to2"]
    invoice.bill_to3 = data["bill_to3"]
    invoice.ship_from1 = data["ship_from1"]
    invoice.ship_from2 = data["ship_from2"]
    invoice.ship_from3 = data["ship_from3"]
    invoice.company_name = data["company_name"]

    db.session.commit()
    
    return "Invoice updated successfully"

@app.route("/view_invoice/<invoice_number>")
def view_invoice_view_(invoice_number):
    return render_template("view_invoice.html")

@app.route("/get_invoice_details/<invoice_number>")
def get_invoice_details_view_(invoice_number):
    invoice = Invoice.query.get(invoice_number)
    invoice_object = {}
    invoice_object["id"] = invoice.id 
    invoice_object["bill_to"] = invoice.bill_to_id
    invoice_object["ship_from"] = invoice.ship_from_id
    invoice_object["ship_to"] = invoice.ship_to_id
    invoice_object["bl_number"] = invoice.bl_number
    invoice_object["date"] = invoice.date
    invoice_object["type"] = invoice.type
    invoice_object["terms"] = invoice.terms
    invoice_object["extra_info"] = invoice.extra_info
    invoice_object["all_items"] = invoice.all_items
    invoice_object["bank_details"] = invoice.bank_details

    return jsonify(invoice_object)