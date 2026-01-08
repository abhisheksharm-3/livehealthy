"""Marshmallow schemas for request validation."""

from marshmallow import Schema, ValidationError, fields, validate


class PredictionInputSchema(Schema):
    """Schema for validating prediction input data."""

    Age = fields.Float(required=True, validate=validate.Range(min=1, max=120))
    Gender = fields.String(required=True, validate=validate.OneOf(["Male", "Female"]))
    Height = fields.Float(required=True, validate=validate.Range(min=0.5, max=3.0))
    Weight = fields.Float(required=True, validate=validate.Range(min=10, max=500))

    family_history_with_overweight = fields.String(
        required=True, validate=validate.OneOf(["yes", "no"])
    )
    FAVC = fields.String(required=True, validate=validate.OneOf(["yes", "no"]))
    FCVC = fields.Float(required=True, validate=validate.Range(min=1, max=3))
    NCP = fields.Float(required=True, validate=validate.Range(min=1, max=4))
    CAEC = fields.String(
        required=True,
        validate=validate.OneOf(["no", "Sometimes", "Frequently", "Always"]),
    )
    SMOKE = fields.String(required=True, validate=validate.OneOf(["yes", "no"]))
    CH2O = fields.Float(required=True, validate=validate.Range(min=1, max=3))
    SCC = fields.String(required=True, validate=validate.OneOf(["yes", "no"]))
    FAF = fields.Float(required=True, validate=validate.Range(min=0, max=3))
    TUE = fields.Float(required=True, validate=validate.Range(min=0, max=2))
    CALC = fields.String(
        required=True,
        validate=validate.OneOf(["no", "Sometimes", "Frequently", "Always"]),
    )
    MTRANS = fields.String(
        required=True,
        validate=validate.OneOf(
            ["Automobile", "Motorbike", "Bike", "Public_Transportation", "Walking"]
        ),
    )


prediction_schema = PredictionInputSchema()


def preprocess_for_model(validated_data: dict) -> dict:
    """
    Transform validated string data to numeric encoding expected by the model.

    Args:
        validated_data: Dictionary with validated string values

    Returns:
        Dictionary with numeric encoded values for the model
    """
    # Create a copy to avoid modifying the original
    processed = validated_data.copy()

    # Gender encoding: Female = 2, Male = 3
    if processed["Gender"] == "Female":
        processed["Gender"] = 2
    else:  # Male
        processed["Gender"] = 3

    # Binary yes/no fields: no = 2, yes = 3
    binary_fields = ["family_history_with_overweight", "FAVC", "SCC", "SMOKE"]
    for field in binary_fields:
        if processed[field] == "no":
            processed[field] = 2
        else:  # yes
            processed[field] = 3

    # CAEC encoding: no = 2, Sometimes = 3, Frequently = 4, Always = 5
    caec_map = {"no": 2, "Sometimes": 3, "Frequently": 4, "Always": 5}
    processed["CAEC"] = caec_map[processed["CAEC"]]

    # CALC encoding: no = 2, Sometimes = 3, Frequently = 4, Always = 5
    calc_map = {"no": 2, "Sometimes": 3, "Frequently": 4, "Always": 5}
    processed["CALC"] = calc_map[processed["CALC"]]

    # MTRANS encoding: Automobile = 2, Motorbike = 3, Bike = 4, Public_Transportation = 5, Walking = 6
    mtrans_map = {
        "Automobile": 2,
        "Motorbike": 3,
        "Bike": 4,
        "Public_Transportation": 5,
        "Walking": 6,
    }
    processed["MTRANS"] = mtrans_map[processed["MTRANS"]]

    return processed


def validate_prediction_input(data: dict) -> tuple[dict | None, str | None]:
    """
    Validate prediction input data and preprocess for model.

    Returns:
        Tuple of (preprocessed_data, error_message).
        If validation passes, error_message is None.
        If validation fails, preprocessed_data is None.
    """
    try:
        validated = prediction_schema.load(data)
        preprocessed = preprocess_for_model(validated)
        return preprocessed, None
    except ValidationError as e:
        # Get first error message
        first_field = list(e.messages.keys())[0]
        first_error = e.messages[first_field][0]
        return None, f"{first_field}: {first_error}"
