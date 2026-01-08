"""
Application configuration management.
"""
import os


class Config:
    """Base configuration class."""
    
    MODEL_PATH = os.environ.get('MODEL_PATH', './models/obesityAI.joblib')
    SCALER_PATH = os.environ.get('SCALER_PATH', './models/scaler.joblib')
    
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:5173').split(',')
    
    RATE_LIMIT_DEFAULT = os.environ.get('RATE_LIMIT_DEFAULT', '100 per minute')
    RATE_LIMIT_ANALYSE = os.environ.get('RATE_LIMIT_ANALYSE', '20 per minute')
    
    DEBUG = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'


class DevelopmentConfig(Config):
    """Development configuration."""
    
    DEBUG = True
    CORS_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://livehealthy.vercel.app']


class ProductionConfig(Config):
    """Production configuration."""
    
    DEBUG = False


def get_config():
    """Get configuration based on environment."""
    env = os.environ.get('FLASK_ENV', 'development')
    configs = {
        'development': DevelopmentConfig,
        'production': ProductionConfig
    }
    return configs.get(env, DevelopmentConfig)
