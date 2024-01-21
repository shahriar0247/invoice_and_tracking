import json

from flask import jsonify, redirect, request

from app import app, db
from app.models.modals import Bill_to, Purchase_Order, Invoice, Ship_from, Ship_to


@app.route("/get/invoice")
def get_invoice_view():
    all_invoice = []
    all_invoices_raw = Invoice.query.order_by(Invoice.id).all()
    for invoice in all_invoices_raw:
        if invoice.deleted == "True": continue
        invoice_object = {}
        invoice_object["id"] = invoice.id
        try:
            invoice_object["bill_to"] = Bill_to.query.get(invoice.bill_to_id).name
        except:
            pass
            
        try:
            invoice_object["ship_from"] = Ship_from.query.get(invoice.ship_from_id).name
        except:
            pass
        
        try:
            invoice_object["ship_to"] = Ship_to.query.get(invoice.ship_to_id).name
        except:
            pass
        
        invoice_object["bl_number"] = invoice.bl_number
        invoice_object["type"] = invoice.type
        invoice_object["date"] = invoice.date
        invoice_object["due_date"] = invoice.due_date
        invoice_object["description"] = invoice.description
        invoice_object["invoice_status"] = invoice.invoice_status
        invoice_object["all_items"] = invoice.all_items

        all_invoice.append(invoice_object)

    return jsonify(all_invoice)


@app.route("/create/invoice/<invoice_id>", methods=["POST"])
def create_invoice_view(invoice_id):
    data = request.json

    invoice = Invoice.query.get(invoice_id)

    if invoice and data["edit"]:
        invoice.bill_to_id = data.get("bill_to_id", invoice.bill_to_id)
        invoice.ship_from_id = data.get("ship_from_id", invoice.ship_from_id)
        invoice.ship_to_id = data.get("ship_to_id", invoice.ship_to_id)
        invoice.date = data.get("date", invoice.date)
        invoice.due_date = data.get("due_date", invoice.due_date)
        invoice.terms = data.get("terms", invoice.terms)
        invoice.extra_info = data.get("extra_info", invoice.extra_info)
        invoice.bank_details = data.get("bank_details", invoice.bank_details)
        invoice.bl_number = data.get("bl_number", invoice.bl_number)
        invoice.type = data.get("type", invoice.type)
        invoice.description = data.get("description", invoice.description)
        invoice.invoice_status = data.get("invoice_status", invoice.invoice_status)

        invoice.all_items = json.dumps(
            data.get("all_items", json.loads(invoice.all_items))
        )

        db.session.commit()

        return "Invoice updated successfully"

    new_invoice = Invoice(
        id=(data["id"]),
        bill_to_id=(data["bill_to_id"]),
        ship_from_id=data["ship_from_id"],
        ship_to_id=(data["ship_to_id"]),
        date=data["date"],
        due_date=data["due_date"],
        terms=data["terms"],
        extra_info=data["extra_info"],
        bank_details=data["bank_details"],
        bl_number=data["bl_number"],
        type=data["type"],
        description=data["description"],
        invoice_status=data["invoice_status"],
        all_items=json.dumps(data["all_items"]),
    )

    db.session.add(new_invoice)
    db.session.commit()

    return "Invoice created successfully"


@app.route("/delete/invoice/<invoice_id>", methods=["DELETE"])
def delete_invoice(invoice_id):
    invoice = Invoice.query.get(invoice_id)

    if invoice:
        db.session.delete(invoice)
        db.session.commit()
        return "Invoice deleted successfully"

    return "Invoice not found", 404




@app.route("/get_invoice_details/<invoice_number>")
def get_invoice_details_view_(invoice_number):
    invoice = Invoice.query.get(invoice_number)
    invoice_object = {}
    invoice_object["id"] = invoice.id
    bill_to = Bill_to.query.get(invoice.bill_to_id)
    bill_to_object = {}
    bill_to_object["id"] = bill_to.id
    bill_to_object["name"] = bill_to.name
    bill_to_object["address1"] = bill_to.address1
    bill_to_object["address2"] = bill_to.address2
    invoice_object["bill_to"] = bill_to_object

    ship_from = Ship_from.query.get(invoice.ship_from_id)
    ship_from_object = {}
    ship_from_object["id"] = ship_from.id
    ship_from_object["name"] = ship_from.name
    ship_from_object["address1"] = ship_from.address1
    ship_from_object["address2"] = ship_from.address2
    invoice_object["ship_from"] = ship_from_object

    ship_to = Ship_to.query.get(invoice.ship_to_id)
    ship_to_object = {}
    ship_to_object["id"] = ship_to.id
    ship_to_object["name"] = ship_to.name
    ship_to_object["address1"] = ship_to.address1
    ship_to_object["address2"] = ship_to.address2
    invoice_object["ship_to"] = ship_to_object

    invoice_object["bl_number"] = invoice.bl_number
    invoice_object["date"] = invoice.date
    invoice_object["due_date"] = invoice.due_date
    invoice_object["type"] = invoice.type
    invoice_object["terms"] = invoice.terms
    invoice_object["extra_info"] = invoice.extra_info
    invoice_object["all_items"] = invoice.all_items
    invoice_object["bank_details"] = invoice.bank_details
    
    invoice_object["invoice_status"] = invoice.invoice_status
    invoice_object["description"] = invoice.description

    return jsonify(invoice_object)


@app.route("/get_invoice_details_for_daily_accounts/<invoice_number>")
def get_invoice_details_for_daily_accounts_view(invoice_number):
    invoice = Invoice.query.get(invoice_number)
    invoice_object = {}
    invoice_object["id"] = invoice.id
    invoice_object["bill_to"] = Bill_to.query.get(invoice.bill_to_id).name
    invoice_object["ship_from"] = Ship_from.query.get(invoice.ship_from_id).name
    invoice_object["ship_to"] = Ship_to.query.get(invoice.ship_to_id).name
    invoice_object["bl_number"] = invoice.bl_number
    invoice_object["date"] = invoice.date
    invoice_object["type"] = invoice.type
    invoice_object["terms"] = invoice.terms
    invoice_object["extra_info"] = invoice.extra_info
    invoice_object["all_items"] = invoice.all_items
    invoice_object["bank_details"] = invoice.bank_details
    invoice_object["description"] = invoice.description
    invoice_object["invoice_status"] = invoice.invoice_status

    return jsonify(invoice_object)

@app.route("/invoice/change_status", methods=["POST"])
def update_invoice_status():
    invoice = Invoice.query.get(request.json.get("id"))

    if not invoice:
        return "Invoice not found", 404

    # Parse request data to update the invoice
    data = request.json  # Assuming you receive JSON data from the request
    invoice.invoice_status = data["status"]

    db.session.commit()

    return "Invoice status updated successfully to " + data['status']

