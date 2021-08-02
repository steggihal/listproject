from marshmallow import Schema, fields, validates, ValidationError, validates_schema
from marshmallow.validate import Length


class ValidateFields(Schema):
    username = fields.Str(required=True, validate=Length(min=4))
    email = fields.Email(required=True, )
    password1 = fields.Str(required=True, validate=Length(min=8))
    password2 = fields.Str(required=True, validate=Length(min=8))

    @validates('password1')
    def validate_password(self, input):
        if not any(map(str.isdigit, input)):
            raise ValidationError('must contain at least one digit')

    @validates('password2')
    def validate_password2(self, input):
        if not any(map(str.isdigit, input)):
            raise ValidationError('must contain at least one digit')

    @validates('username')
    def validate_name(self, input):
        if any(map(str.isdigit, input)):
            raise ValidationError('numbers not allowed')

    @validates_schema
    def passwords_match(self, all_data, **kwargs):
        if all_data['password1'] != all_data['password2']:
            raise ValidationError('passwords must match')
