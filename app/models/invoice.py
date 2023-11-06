from app import db, app
from dataclasses import dataclass

@dataclass
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

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address1': self.address1,
            'address2': self.address2,
            'address3': self.address3,
            'tel': self.tel,
            'fax': self.fax,
            'gst': self.gst,
            'bank_details': self.bank_details,
        }

@dataclass
class Bill_to(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))
    invoice = db.relationship('Invoice', back_populates='bill_to')


    

@dataclass 
class Ship_from(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))
    invoice = db.relationship('Invoice', back_populates='ship_from')



@dataclass  
class Ship_to(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))
    invoice = db.relationship('Invoice', back_populates='ship_to')

@dataclass
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    description = db.Column(db.String(200))
    quantity = db.Column(db.Integer)
    price = db.Column(db.Integer)
    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))


@dataclass
class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.relationship('Company', back_populates='invoice')
    bill_to = db.relationship('Bill_to', back_populates='invoice')
    ship_from = db.relationship('Ship_from', back_populates='invoice')
    ship_to = db.relationship('Ship_to', back_populates='invoice')
    item = db.relationship('Item', backref='invoice', lazy=True)

    date = db.Column(db.DateTime)
    terms = db.Column(db.String(200))
    extra_info = db.Column(db.String(200))

with app.app_context():
    db.create_all()

