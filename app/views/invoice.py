from flask import redirect, render_template, request
from app import app, db
from app.models.invoice import Bill_to, Company, Invoice, Ship_from, Ship_to

@app.route("/")
def home():
    return redirect("/invoice")

@app.route("/invoice")
def invoice_view():
    return render_template("invoice.html")
@app.route("/get/invoice")
def get_invoice_view():
    invoice = Invoice.query.all()
    return invoice
@app.route("/get/company")
def get_company_view():
    invoice = Company.query.one()
    return invoice
@app.route("/get/bill_to")
def get_bill_to_view():
    invoice = Bill_to.query.all()
    return invoice
@app.route("/get/ship_from")
def get_ship_from_view():
    invoice = Ship_from.query.all()
    return invoice

@app.route("/get/ship_to")
def get_ship_to_view():
    ship_to = Ship_to.query.all()
    return ship_to

@app.route("/create/invoice", methods=["POST"])
def create_invoice_view():
    data = request.json  # Assuming you receive JSON data from the request
    new_invoice = Invoice(
        date=data["date"],
        terms=data["terms"],
        bill_to1=data["bill_to1"],
        bill_to2=data["bill_to2"],
        bill_to3=data["bill_to3"],
        ship_from1=data["ship_from1"],
        ship_from2=data["ship_from2"],
        ship_from3=data["ship_from3"],
        company_name=data["company_name"],
        completed=False
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