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


class Bill_to(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))


    

class Ship_from(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))

 
class Ship_to(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    description = db.Column(db.String(200))
    price = db.Column(db.Float(precision=5))
    quantity = db.Column(db.Integer)


class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    bill_to_id = db.Column(db.Integer, db.ForeignKey('bill_to.id'))
    ship_from_id = db.Column(db.Integer, db.ForeignKey('ship_from.id'))
    ship_to_id = db.Column(db.Integer, db.ForeignKey('ship_to.id'))
    all_items = db.Column(db.String(500))
    
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


class Vendor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    address1 = db.Column(db.String(200))
    address2 = db.Column(db.String(200))
    
class Purchase_Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    vendor_id = db.Column(db.Integer, db.ForeignKey('vendor.id'))
    all_items = db.Column(db.String(500))

    invoice_id = db.Column(db.Integer, db.ForeignKey('invoice.id'))
    
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

class Daily_Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    purchase_order_id = db.Column(db.Integer, db.ForeignKey('purchase__order.id'))
    all_items = db.Column(db.String(500))


with app.app_context():
    db.create_all()

