from app import db, app

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
    price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))


class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.relationship('Company', back_populates='invoice', uselist=False)
    bill_to = db.relationship('Bill_to', back_populates='invoice', uselist=False)
    ship_from = db.relationship('Ship_from', back_populates='invoice', uselist=False)
    ship_to = db.relationship('Ship_to', back_populates='invoice', uselist=False)
    items = db.relationship('Item', backref='invoice', lazy=True)


    date = db.Column(db.DateTime)
    terms = db.Column(db.String(200))
    extra_info = db.Column(db.String(200))
    bl_number = db.Column(db.String(200))
    bank_details = db.Column(db.String(200))
    type = db.Column(db.String(200))

    # tracking params
    container = db.Column(db.String(200))
    departure = db.Column(db.String(200))
    location_status = db.Column(db.String(200))
    custom_tracking = db.Column(db.String(200))
    BL = db.Column(db.String(200))
    Deli = db.Column(db.String(200))
    Manifest = db.Column(db.String(200))
    

with app.app_context():
    db.create_all()

