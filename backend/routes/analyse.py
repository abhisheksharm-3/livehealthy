"""Analysis/prediction endpoint with rate limiting and validation."""
import hashlib
import json
import logging
from functools import lru_cache
from flask import Blueprint, request, jsonify

from services.prediction import PredictionService
from schemas import validate_prediction_input

logger = logging.getLogger(__name__)
analyse_bp = Blueprint('analyse', __name__)

# Simple in-memory cache for predictions
_prediction_cache: dict[str, dict] = {}
MAX_CACHE_SIZE = 100


def _get_cache_key(data: dict) -> str:
    """Generate a cache key from input data."""
    sorted_data = json.dumps(data, sort_keys=True)
    return hashlib.md5(sorted_data.encode()).hexdigest()


def _get_cached_prediction(data: dict) -> dict | None:
    """Get cached prediction if available."""
    key = _get_cache_key(data)
    return _prediction_cache.get(key)


def _cache_prediction(data: dict, result: dict) -> None:
    """Cache a prediction result."""
    if len(_prediction_cache) >= MAX_CACHE_SIZE:
        # Remove oldest entry (FIFO)
        oldest_key = next(iter(_prediction_cache))
        del _prediction_cache[oldest_key]
    
    key = _get_cache_key(data)
    _prediction_cache[key] = result


@analyse_bp.route('/analyse', methods=['POST'])
def analyze():
    """Process health data and return obesity prediction."""
    data = request.get_json()
    
    if not data or 'data' not in data:
        return jsonify({'error': 'Request must include a data object'}), 400
    
    features = data['data']
    
    # Validate input
    validated_data, error = validate_prediction_input(features)
    if error:
        return jsonify({'error': f'Validation failed: {error}'}), 400
    
    # Check cache
    cached = _get_cached_prediction(validated_data)
    if cached:
        logger.info('Returning cached prediction')
        return jsonify(cached), 200
    
    # Get prediction
    result = PredictionService.predict(validated_data)
    
    if 'error' in result:
        return jsonify(result), 400
    
    # Cache successful result
    _cache_prediction(validated_data, result)
    
    return jsonify(result), 200
