"""Routes package for API endpoints."""
from routes.health import health_bp
from routes.analyse import analyse_bp

__all__ = ['health_bp', 'analyse_bp']
