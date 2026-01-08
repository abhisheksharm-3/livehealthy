"""Marshmallow schemas for request validation."""
from marshmallow import Schema, fields, validate, ValidationError


class PredictionInputSchema(Schema):
    """Schema for validating prediction input data."""
    Age = fields.Float(required=True, validate=validate.Range(min=1, max=120))
    Gender = fields.String(required=True, validate=validate.OneOf(['Male', 'Female']))
    Height = fields.Float(required=True, validate=validate.Range(min=0.5, max=3.0))
    Weight = fields.Float(required=True, validate=validate.Range(min=10, max=500))
    
    family_history_with_overweight = fields.String(
        required=True, 
        validate=validate.OneOf(['yes', 'no'])
    )
    FAVC = fields.String(required=True, validate=validate.OneOf(['yes', 'no']))
    FCVC = fields.Float(required=True, validate=validate.Range(min=1, max=3))
    NCP = fields.Float(required=True, validate=validate.Range(min=1, max=4))
    CAEC = fields.String(
        required=True, 
        validate=validate.OneOf(['no', 'Sometimes', 'Frequently', 'Always'])
    )
    SMOKE = fields.String(required=True, validate=validate.OneOf(['yes', 'no']))
    CH2O = fields.Float(required=True, validate=validate.Range(min=1, max=3))
    SCC = fields.String(required=True, validate=validate.OneOf(['yes', 'no']))
    FAF = fields.Float(required=True, validate=validate.Range(min=0, max=3))
    TUE = fields.Float(required=True, validate=validate.Range(min=0, max=2))
    CALC = fields.String(
        required=True, 
        validate=validate.OneOf(['no', 'Sometimes', 'Frequently', 'Always'])
    )
    MTRANS = fields.String(
        required=True,
        validate=validate.OneOf([
            'Automobile', 'Motorbike', 'Bike', 'Public_Transportation', 'Walking'
        ])
    )


prediction_schema = PredictionInputSchema()


def validate_prediction_input(data: dict) -> tuple[dict | None, str | None]:
    """
    Validate prediction input data.
    
    Returns:
        Tuple of (validated_data, error_message).
        If validation passes, error_message is None.
        If validation fails, validated_data is None.
    """
    try:
        validated = prediction_schema.load(data)
        return validated, None
    except ValidationError as e:
        # Get first error message
        first_field = list(e.messages.keys())[0]
        first_error = e.messages[first_field][0]
        return None, f"{first_field}: {first_error}"
