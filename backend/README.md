# LiveHealthy Backend

Flask API server for obesity prediction using machine learning.

## Tech Stack

- **Framework**: Flask 3.0
- **ML**: scikit-learn 1.2
- **Server**: Gunicorn

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/analyse` | Submit health data for prediction |
| GET | `/stats` | Global health statistics |

## Project Structure

```
backend/
├── app.py          # Application factory
├── config.py       # Configuration
├── models/         # ML models (.pkl)
├── routes/         # API route handlers
├── services/       # Business logic
└── requirements.txt
```

## Setup

```bash
# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Run development server
flask run
```

## Production

```bash
gunicorn app:app
```

## Environment Variables

```env
FLASK_ENV=development
CORS_ORIGINS=http://localhost:5173
```
