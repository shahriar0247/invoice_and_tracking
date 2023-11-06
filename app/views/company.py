
import json

from flask import jsonify, redirect, render_template, request

from app import app, db
from app.models.modals import Bill_to, Company, Invoice, Ship_from, Ship_to

@app.route("/company")
def company_view():
    return render_template("company.html")


@app.route("/get/company")
def get_company_view():
    company = Company.query.one()
    company_object = {}
    company_object["name"] = company.name 
    company_object["address1"] = company.address1 
    company_object["address2"] = company.address2 
    company_object["address3"] = company.address3 
    company_object["tel"] = company.tel 
    company_object["fax"] = company.fax 
    company_object["gst"] = company.gst 
    company_object["bank_details"] = company.bank_details 
    return jsonify(company_object)


@app.route("/create/company", methods=["POST"])
def create_company_view():
    try:
        db.session.query(Company).delete()
        db.session.commit()
    except:
        db.session.rollback()

    data = request.json  
    new_company = Company(
        name=data["name"],
        address1=data["address1"],
        address2=data["address2"],
        address3=data["address3"],
        tel=data["tel"],
        fax=data["fax"],
        gst=data["gst"],
        bank_details=data["bank_details"],
    )

    db.session.add(new_company)
    db.session.commit()
    
    return "Invoice created successfully"