from backend.db import db
from sqlalchemy import Column


class ToDoItems(db.Model):
    __tablename__ = 'todoitems'

    task = Column(db.Text)
    status = Column(db.Boolean, default=False)
    checked = Column(db.Boolean, default=False)
    id = Column(db.Integer, primary_key=True)
    user_id = Column('fk_item_id',
                     db.Integer,
                     db.ForeignKey('users.id'),
                     nullable=True,
                     )
    users = db.relationship('Users', lazy=False)

    def to_json(self):
        return dict(
            task=self.task,
            id=self.id,
            status=self.status,
            checked=self.checked,
        )
