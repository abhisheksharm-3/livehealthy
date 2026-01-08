"""
Prediction service for obesity classification.
"""
import logging
import pandas as pd
from joblib import load

from config import get_config
from services.validation import ValidationService

logger = logging.getLogger(__name__)


class PredictionService:
    """Handles ML model loading and predictions."""
    
    _model = None
    _scaler = None
    
    @classmethod
    def _load_model(cls):
        """Lazy load the ML model and scaler."""
        if cls._model is None:
            config = get_config()
            logger.info('Loading model from %s', config.MODEL_PATH)
            cls._model = load(config.MODEL_PATH)
            cls._scaler = load(config.SCALER_PATH)
    
    @classmethod
    def predict(cls, features):
        """
        Make a prediction based on input features.
        
        Args:
            features: Dictionary of feature name to value mappings.
            
        Returns:
            Dictionary with prediction result or error.
        """
        is_valid, error = ValidationService.validate_features(features)
        if not is_valid:
            return {'error': error}
        
        cls._load_model()
        
        expected_order = ValidationService.get_expected_features()
        input_df = pd.DataFrame([features], columns=expected_order)
        scaled_input = cls._scaler.transform(input_df)
        predictions = cls._model.predict(scaled_input)
        
        return {'prediction_result': predictions.tolist()}
    
    @classmethod
    def get_stats(cls):
        """Get predefined dataset statistics."""
        return {
            'average_age': 24.31,
            'average_height': 1.70,
            'average_meals': 2.69,
            'average_physical_activity': 1.01,
            'average_technology_hours': 0.66,
            'average_vegetable_consumption': 2.42,
            'average_water_liters': 2.01,
            'average_weight': 86.59,
            'high_caloric_food_proportion': 0.88,
            'smoking_proportion': 0.02,
            'family_overweight_proportion': 0.82
        }
