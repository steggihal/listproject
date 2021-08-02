from flask.views import MethodView
from flask import jsonify, request, flash
import json
from marshmallow import ValidationError
from backend.user_database import UserDatabase
from backend.db import db
from backend.models.SQLA_users import Users
from backend.validation.validate_fields import ValidateFields


class UsersList(MethodView):

    def get(self, user_id):
        if user_id is None:
            raw_data = db.session.query(Users).all()
            response = [item.to_json() for item in raw_data]
            return jsonify(response)

    def post(self):
        validation_schema = ValidateFields()
        try:
            new_item = validation_schema.load(request.json)
            new_username = new_item['username']
            new_email = new_item['email']
            new_item = Users(username=new_item['username'], email=new_item['email'],
                             password1=new_item['password1'], password2=new_item['password2'])
            print(bool(Users.query.filter(Users.username == new_username).first() and Users.query.filter(
                    Users.email == new_email).first()))
            if bool(Users.query.filter(Users.username == new_username).first() or Users.query.filter(
                    Users.email == new_email).first()) is False:
                db.session.add(new_item)
                db.session.commit()
                return jsonify({'success': True})
            else:
                return 'False'
            # return self.get(None)
            # _NewUser = NewUserDatabase()
            # _NewUser.save(new_item)
            # all_items = _NewUser.load()
            # return jsonify(all_items)
        except ValidationError as e:
            return jsonify(e.messages), 400

    # def post(self):
    #     new_item = json.loads(request.data)
    #     _ItemDB = UserDatabase()
    #     _ItemDB.save(new_item)
    #     all_items = _ItemDB.load()
    #     return jsonify(all_items)
    #
    # def delete(self, item_id):
    #     _ItemDb = UserDatabase()
    #     all_items = _ItemDb.load()
    #     for item in all_items:
    #         if item['id'] == item_id:
    #             _ItemDb.update_status(item)
    #     final_list = _ItemDb.load_non_deleted()
    #     return jsonify(final_list)
    pass
