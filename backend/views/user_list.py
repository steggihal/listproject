from flask.views import MethodView
from flask import jsonify, request, flash
import json
from flask_jwt import jwt_required, current_identity
from marshmallow import ValidationError
from backend.user_database import UserDatabase
from backend.db import db
from backend.models.SQLA_users import Users
from backend.validation.validate_fields import ValidateFields
import bcrypt


class UsersList(MethodView):

    def get(self, user_id):
        schema = ValidateFields(only=['username', 'password1'])
        raw_data = db.session.query(Users).filter(Users.id == user_id).first()
        users_json = schema.dump(raw_data)
        items_json = [item.to_json() for item in users_json.items]
        return jsonify(dict(users=users_json, items=items_json))

    def post(self):
        validation_schema = ValidateFields()
        try:
            loaded_item = validation_schema.load(request.json)
            new_username = loaded_item['username']
            new_email = loaded_item['email']
            new_item = Users(username=loaded_item['username'], email=loaded_item['email'],
                             password1=loaded_item['password1'], password2=loaded_item['password2'])
            new_item.password1 = bcrypt.hashpw(new_item.password1.encode(), bcrypt.gensalt()).decode()
            print(bool(Users.query.filter(Users.username == new_username).first() and Users.query.filter(
                Users.email == new_email).first()))
            if bool(Users.query.filter(Users.username == new_username).first() or Users.query.filter(
                    Users.email == new_email).first()) is False:
                db.session.add(new_item)
                db.session.commit()
                return jsonify({'success': True})
            else:
                return 'False'
        except ValidationError as e:
            return jsonify(e.messages), 400

    pass
