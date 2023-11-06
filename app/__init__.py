from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://invoice_and_tracking:invoice_and_tracking@host:port/invoice_and_tracking'

db = SQLAlchemy(app)

from .models import *

from .views import *

db.create_all()
