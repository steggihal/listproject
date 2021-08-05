from flask.views import MethodView
from flask import jsonify, request
import json
from flask_jwt import jwt_required, current_identity
from backend.db import db
from backend.models.SQLA_todoitems import ToDoItems
from backend.models.SQLA_users import Users
from backend.validation.validate_fields import ValidateFields


def status_check(items):
    final_list = []
    for item in items:
        if not item['status']:
            final_list.append(item)
    return final_list


class ItemView(MethodView):

    @jwt_required()
    def get(self, item_id):
        raw_task = db.session.query(ToDoItems).filter(ToDoItems.user_id == current_identity.id).all()
        response = [item.to_json() for item in raw_task]
        result = status_check(response)
        return jsonify(result)

    @jwt_required()
    def post(self):
        raw_data = json.loads(request.data)
        new_item = ToDoItems(task=raw_data['task'], user_id=current_identity.id)
        db.session.add(new_item)
        db.session.commit()
        all_data = db.session.query(ToDoItems).filter(current_identity.id == ToDoItems.user_id).all()
        response = [item.to_json() for item in all_data]
        result = status_check(response)
        return jsonify(result)

    @jwt_required()
    def delete(self, item_id):
        db.session.query(ToDoItems).filter(ToDoItems.id == item_id).update({ToDoItems.status: True})
        db.session.commit()
        raw_task = db.session.query(ToDoItems).filter(current_identity.id == ToDoItems.user_id).all()
        response = [item.to_json() for item in raw_task]
        result = status_check(response)
        return jsonify(result)
    # db.session.commit()
    # return jsonify()
    # _ItemDb = ItemDatabase()
    # all_items = _ItemDb.load()
    # for item in all_items:
    #     if item['id'] == item_id:
    #         _ItemDb.update_status(item)
    # final_list = _ItemDb.load_non_deleted()
    # return jsonify(final_list)


pass
