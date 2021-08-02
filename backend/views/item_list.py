from flask.views import MethodView
from flask import jsonify, request
import json

from backend.item_database import ItemDatabase
from backend.db import db
from backend.models.SQLA_todoitems import ToDoItems


def status_check(items):
    final_list = []
    for item in items:
        if not item['status']:
            final_list.append(item)
    return final_list


class ItemView(MethodView):

    def get(self, item_id):
        if item_id is None:
            raw_task = db.session.query(ToDoItems).all()
            response = [item.to_json() for item in raw_task]
            result = status_check(response)
            return jsonify(result)

    def post(self):
        raw_data = json.loads(request.data)
        new_item = ToDoItems(task=raw_data['task'])
        db.session.add(new_item)
        db.session.commit()
        return self.get(None)
        # _ItemDB = ItemDatabase()
        # _ItemDB.save(new_item)
        # all_items = _ItemDB.load_non_deleted()
        # return jsonify(all_items)

    def delete(self, item_id):
        db.session.query(ToDoItems).filter(ToDoItems.id == item_id).update({ToDoItems.status: True})
        db.session.commit()
        raw_task = db.session.query(ToDoItems).all()
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
