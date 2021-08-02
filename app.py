from flask import Flask, jsonify, request
from flask_cors import CORS
import json
# from backend.views.accounts_view import AccountsView
from backend.views.item_list import ItemView
from backend.views.user_list import UsersList
from sqlalchemy.engine import URL
from backend.db import db

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = URL(
    drivername='postgresql',
    host='localhost',
    database='directory',
    password='Saga@123',
    port='5432',
    username='sampada'
)

db.init_app(app)


def register_api(view, endpoint, url, pk='id', pk_type='int'):
    view_func = view.as_view(endpoint)
    app.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET',])
    app.add_url_rule(url, view_func=view_func, methods=['POST',])
    app.add_url_rule(f'{url}<{pk_type}:{pk}>', view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])


register_api(ItemView, 'items', '/api/items/', 'item_id')
register_api(UsersList, 'users', '/api/users/', 'user_id')
