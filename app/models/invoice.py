from app import db


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))
    address3 = db.Column(db.String(200))
    tel = db.Column(db.String(200))
    fax = db.Column(db.String(200))
    gst = db.Column(db.String(200))
    bank_details = db.Column(db.String(200))
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))
    invoice = db.relationship('Invoice', back_populates='company')

class Bill_to(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))
    invoice = db.relationship('Invoice', back_populates='bill_to')


    
 
class Ship_from(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))
    invoice = db.relationship('Invoice', back_populates='ship_from')


  
class Ship_to(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))
    invoice = db.relationship('Invoice', back_populates='ship_to')

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    description = db.Column(db.String(200))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Integer)
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))


class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.relationship('Company', back_populates='invoice')
    bill_to = db.relationship('Bill_to', back_populates='invoice')
    ship_from = db.relationship('Bill_from', back_populates='invoice')
    ship_to = db.relationship('Bill_from', back_populates='invoice')
    item = db.relationship('Item', backref='invoice', lazy=True)

    date = db.Column(db.DateTime)
    terms = db.Column(db.String(200))
    bill_to1 = db.Column(db.String(200))
    bill_to2 = db.Column(db.String(200))
    bill_to3 = db.Column(db.String(200))
    ship_from1 = db.Column(db.String(200))
    ship_from2 = db.Column(db.String(200))
    ship_from3 = db.Column(db.String(200))
    comapany_name = db.Column(db.String(200))
    completed = db.Column(db.Boolean, default=False)



db.create_all()

