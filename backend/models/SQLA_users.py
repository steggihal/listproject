from backend.db import db


class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    email = db.Column(db.Text)
    password1 = db.Column(db.Text)
    password2 = db.Column(db.Text)

    # items = db.relationship('todoitems', lazy='joined')

    def to_json(self):
        return dict(
            username=self.username,
            id=self.id,
            email=self.email,
            password1=self.password1,
            password2=self.password2,
        )
