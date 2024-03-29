import random
from app import db, app

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1200), nullable=True)
    address1 = db.Column(db.String(1200), nullable=True)
    address2 = db.Column(db.String(1200), nullable=True)
    address3 = db.Column(db.String(1200), nullable=True)
    tel = db.Column(db.String(1200), nullable=True)
    fax = db.Column(db.String(1200), nullable=True)
    gst = db.Column(db.String(1200), nullable=True)
    bank_details = db.Column(db.String(1200), nullable=True)


class Bill_to(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1200), nullable=True)
    address1 = db.Column(db.String(1200), nullable=True)
    address2 = db.Column(db.String(1200), nullable=True)
    address3 = db.Column(db.String(1200), nullable=True)
    deleted = db.Column(db.String(10), nullable=True)


class Ship_from(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1200), nullable=True)
    address1 = db.Column(db.String(1200), nullable=True)
    address2 = db.Column(db.String(1200), nullable=True)
    address3 = db.Column(db.String(1200), nullable=True)
    deleted = db.Column(db.String(10), nullable=True)


class Ship_to(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1200), nullable=True)
    address1 = db.Column(db.String(1200), nullable=True)
    address2 = db.Column(db.String(1200), nullable=True)
    address3 = db.Column(db.String(1200), nullable=True)
    deleted = db.Column(db.String(10), nullable=True)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1200), nullable=True)
    description = db.Column(db.String(1200), nullable=True)
    price = db.Column(db.Float(precision=5), nullable=True)
    vendor_cost = db.Column(db.Float(precision=5), nullable=True)
    currency = db.Column(db.String(1200), nullable=True)
    quantity = db.Column(db.Integer, nullable=True)
    vendor_id = db.Column(db.Integer, nullable=True)
    deleted = db.Column(db.String(10), nullable=True)



class Invoice(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=True)

    bill_to_id = db.Column(db.Integer, nullable=True)
    ship_from_id = db.Column(db.Integer, nullable=True)
    ship_to_id = db.Column(db.Integer, nullable=True)
    all_items = db.Column(db.String(500), nullable=True)
    
    date = db.Column(db.DateTime, nullable=True)
    due_date = db.Column(db.DateTime, nullable=True)
    terms = db.Column(db.String(1200), nullable=True)
    invoice_status = db.Column(db.String(1200), nullable=True)
    description = db.Column(db.String(1200), nullable=True)
    extra_info = db.Column(db.String(1200), nullable=True)
    bl_number = db.Column(db.String(1200), nullable=True)
    bank_details = db.Column(db.String(1200), nullable=True)
    type = db.Column(db.String(1200), nullable=True)
    deleted = db.Column(db.String(10), nullable=True)


    def __init__(self, *args, **kwargs):
        if not kwargs.get('id'):
            kwargs['id'] = f'INV - {random.randint(1000000, 9999999)}'
        super(Invoice, self).__init__(*args, **kwargs)



class Shipment(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=True)
    invoice_id =db.Column(db.String(500), nullable=True)

    issued_to_id = db.Column(db.Integer, nullable=True)
    ship_from_id = db.Column(db.Integer, nullable=True)
    ship_to_id = db.Column(db.Integer, nullable=True)
    all_items = db.Column(db.String(500), nullable=True)
    
    arrival_date = db.Column(db.DateTime, nullable=True)
    due_date = db.Column(db.DateTime, nullable=True)
    terms = db.Column(db.String(1200), nullable=True)
    shipment_status = db.Column(db.String(1200), nullable=True)
    description = db.Column(db.String(1200), nullable=True)
    container_number = db.Column(db.String(1200), nullable=True)
    bl_number = db.Column(db.String(1200), nullable=True)
    shipping_details = db.Column(db.String(1200), nullable=True)
    type = db.Column(db.String(1200), nullable=True)
    deleted = db.Column(db.String(10), nullable=True)
    weight = db.Column(db.String(1200), nullable=True)


    def __init__(self, *args, **kwargs):
        if not kwargs.get('id'):
            kwargs['id'] = f'Shipment - {random.randint(1000000, 9999999)}'
        super(Shipment, self).__init__(*args, **kwargs)
        
        
        
class Vendor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1200), nullable=True)
    address1 = db.Column(db.String(1200), nullable=True)
    address2 = db.Column(db.String(1200), nullable=True)
    deleted = db.Column(db.String(10), nullable=True)
    
    
class Purchase_Order(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=True)

    vendor_id = db.Column(db.Integer, nullable=True)
    invoice_id =db.Column(db.Integer, nullable=True)

    all_items = db.Column(db.String(500), nullable=True)
    description = db.Column(db.String(1200), nullable=True)
    date = db.Column(db.DateTime, nullable=True)
    due_date = db.Column(db.DateTime, nullable=True)
    purchase_order_status = db.Column(db.String(1200), nullable=True)
    deleted = db.Column(db.String(10), nullable=True)

    
    def __init__(self, *args, **kwargs):
        if not kwargs.get('id'):
            kwargs['id'] = f'PO - {random.randint(1000000, 9999999)}'
        super(Purchase_Order, self).__init__(*args, **kwargs)

class ItemHistory(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=True)
    all_items = db.Column(db.String(500), nullable=True)
    description = db.Column(db.String(1200), nullable=True)
    date = db.Column(db.DateTime, nullable=True)
    deleted = db.Column(db.String(10), nullable=True)
    

class Daily_Account(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=True)
    description = db.Column(db.String(1200), nullable=True)
    date = db.Column(db.DateTime, nullable=True)
    vendor_id = db.Column(db.Integer, nullable=True)
    bill_to_id = db.Column(db.Integer, nullable=True)
    currency = db.Column(db.String(1200), nullable=True)
    all_items = db.Column(db.String(500), nullable=True)
    
    def __init__(self, *args, **kwargs):
        if not kwargs.get('id'):
            kwargs['id'] = f'DA - {random.randint(1000000, 9999999)}'
        super(Daily_Account, self).__init__(*args, **kwargs)

with app.app_context():
    db.create_all()
