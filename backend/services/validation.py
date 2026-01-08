"""
Input validation service for prediction requests.
"""

EXPECTED_FEATURES = [
    'Age', 'Gender', 'Height', 'Weight', 'CALC', 'FAVC', 'FCVC', 'NCP',
    'SCC', 'SMOKE', 'CH2O', 'family_history_with_overweight', 'FAF',
    'TUE', 'CAEC', 'MTRANS'
]

FEATURE_RANGES = {
    'Age': (0, 120),
    'Gender': (2, 3),
    'Height': (0.5, 2.5),
    'Weight': (10, 300),
    'CALC': (2, 5),
    'FAVC': (2, 3),
    'FCVC': (1, 3),
    'NCP': (1, 4),
    'SCC': (2, 3),
    'SMOKE': (2, 3),
    'CH2O': (0.1, 10),
    'family_history_with_overweight': (2, 3),
    'FAF': (0, 3),
    'TUE': (0, 24),
    'CAEC': (2, 5),
    'MTRANS': (2, 6)
}


class ValidationService:
    """Handles input validation for prediction requests."""
    
    @staticmethod
    def validate_features(features):
        """
        Validate that all required features are present and within valid ranges.
        
        Args:
            features: Dictionary of feature name to value mappings.
            
        Returns:
            Tuple of (is_valid, error_message or None).
        """
        if not isinstance(features, dict):
            return False, 'Features must be a dictionary'
        
        missing = [f for f in EXPECTED_FEATURES if f not in features]
        if missing:
            return False, f'Missing required features: {", ".join(missing)}'
        
        extra = [f for f in features if f not in EXPECTED_FEATURES]
        if extra:
            return False, f'Unexpected features: {", ".join(extra)}'
        
        for feature, value in features.items():
            if not isinstance(value, (int, float)):
                return False, f'Feature {feature} must be a number'
            
            min_val, max_val = FEATURE_RANGES[feature]
            if not min_val <= value <= max_val:
                return False, f'Feature {feature} must be between {min_val} and {max_val}'
        
        return True, None
    
    @staticmethod
    def get_expected_features():
        """Get list of expected feature names."""
        return EXPECTED_FEATURES.copy()
