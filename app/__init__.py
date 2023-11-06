from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://invoice_and_tracking:invoice_and_tracking@localhost:5432 /invoice_and_tracking'

db = SQLAlchemy(app)

from .models.invoice import *


from .views.bill_to import *
from .views.ship_from import *
from .views.ship_to import *
from .views.company import *
from .views.invoice import *

