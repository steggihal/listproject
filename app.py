import os
import bcrypt
from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.views.item_list import ItemView
from backend.views.user_list import UsersList
from backend.models.SQLA_users import Users
from backend.db import db
from flask_jwt import JWT

app = Flask(__name__)
CORS(app)
config_file_name = os.environ['CONFIG']

app.config.from_json(config_file_name)

db.init_app(app)


def authentication(username, password):
    user = db.session.query(Users).filter(Users.username == username).one()
    if bcrypt.checkpw(password.encode(), user.password1.encode()):
        return user


def identity(identity):
    user = db.session.query(Users).filter(Users.id == identity['identity']).one()
    return user


JWT(app, authentication, identity)


def register_api(view, endpoint, url, pk='id', pk_type='int'):
    view_func = view.as_view(endpoint)
    app.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET', ])
    app.add_url_rule(url, view_func=view_func, methods=['POST', ])
    app.add_url_rule(f'{url}/<{pk_type}:{pk}>', view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])


register_api(ItemView, 'items', '/api/items', 'item_id')
register_api(UsersList, 'users', '/api/users', 'user_id')
