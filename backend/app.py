"""
LiveHealthy - Obesity Prediction API Server.
"""
import logging
import os
import sys

from flask import Flask, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import get_config
from routes import health_bp, analyse_bp

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",
)


def create_app():
    """Application factory for creating Flask app instance."""
    app = Flask(__name__)
    config = get_config()
    
    CORS(app, origins=config.CORS_ORIGINS)
    limiter.init_app(app)
    
    # Rate limit specific endpoints
    limiter.limit("30 per minute")(analyse_bp)
    
    app.register_blueprint(health_bp)
    app.register_blueprint(analyse_bp)
    
    # Rate limit error handler
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return jsonify({
            'error': 'Rate limit exceeded. Please try again later.',
            'retry_after': e.description
        }), 429
    
    logger.info('Application initialized with CORS origins: %s', config.CORS_ORIGINS)
    return app


app = create_app()


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')