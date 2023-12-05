from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://invoice_and_tracking:invoice_and_tracking@localhost:5432/invoice_and_tracking'

CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from .models.modals import *

from .views.bill_to import *
from .views.item import *
from .views.company import *
from .views.tracking import *
from .views.invoice import *
from .views.vendor import *
from .views.purchase_order import *
from .views.daily_accounts import *
