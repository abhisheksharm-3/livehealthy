"""Health check endpoint."""
from flask import Blueprint, jsonify

health_bp = Blueprint('health', __name__)


@health_bp.route('/health', methods=['HEAD', 'GET'])
def health_check():
    """Return server health status."""
    return jsonify({'status': 'healthy'}), 200
