from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from backend.item_database import ItemDatabase

app = Flask(__name__)
CORS(app)


def load_task_items():
    with open('backend/data.json', 'r') as file:
        raw_data = json.loads(file.read())
        return raw_data


def write_to_file(items):
    with open('backend/data.json', 'w') as file:
        file.write(json.dumps(items))
        return items


def generate_new_task_id(items):
    new_id = max(items["id"] for items in items) + 1
    return int(new_id)


def status_check(items):
    final_list = []
    for item in items:
        if not item['status']:
            final_list.append(item)
    return final_list


@app.route("/api/items", methods=['GET'])
def get_all_items():
    raw_data = ItemDatabase().return_items()

    # not_deleted = []
    # for i in raw_data:
    #     if not i["status"]:
    #         not_deleted.append(i)
    return jsonify(raw_data)

@app.route("/api/users", methods=['GET'])
def get_users():
    raw_data = ItemDatabase().get_users()
    return jsonify(raw_data)


@app.route("/api/items/<int:item_id>", methods=['GET'])
def find_item(item_id):
    raw_data = load_task_items()
    item_we_found = next((item for item in raw_data if item['id'] == item_id), None)
    return jsonify(item_we_found)


@app.route("/api/items/<int:index>", methods=['DELETE'])
def delete_contact(index):
    _ItemDb = ItemDatabase()
    all_items = _ItemDb.load()
    for tasks in all_items:
        if tasks['id'] == index:
            _ItemDb.update_status(tasks)
    final_list = _ItemDb.return_items()
    return jsonify(final_list)
    # item_value = load_task_items()
    # final_elements = []
    # for tasks in item_value:
    #     if tasks['id'] == index:
    #         tasks['status'] = True
    # # for items in :
    # #     if not items['status']:
    # #         final_elements.append(items)
    # write_to_file(item_value)
    # final_elements = status_check(item_value)
    # return jsonify(final_elements)


@app.route("/api/items", methods=['POST'])
def create_new_task():
    new_items = json.loads(request.data)
    _ItemDb = ItemDatabase()
    _ItemDb.save(new_items)
    final_list = _ItemDb.return_items()
    return jsonify(final_list)
    # final_list = []
    # item_list = load_task_items()
    # new_items["id"] = generate_new_task_id(item_list)
    #
    # item_list.append(new_items)
    # write_to_file(item_list)
    # final_list = status_check(item_list)

