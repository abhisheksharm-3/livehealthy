from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your model and scaler (ensure these paths are correct)
model = load('./models/obesityAI.joblib')
scaler = load('./models/scaler.joblib')  # Load the scaler
# Predefined statistics
stats_summary = {
    "Average Age": 24.312599908574136,
    "Average Height": 1.7016773533870204,
    "Average Number of Meals": 2.6856280497394596,
    "Average Physical Activity Frequency": 1.0102976958787304,
    "Average Technology Use (hours)": 0.657865923732828,
    "Average Vegetable Consumption (scale 1-3)": 2.4190430615821885,
    "Average Water Consumption (liters)": 2.0080114040738986,
    "Average Weight": 86.58605812648035,
    "Proportion Who Frequently Eat High Caloric Food": 0.8839412600663192,
    "Proportion Who Smoke": 0.020843202273803884,
    "Proportion with Family History of Overweight": 0.817621980104216
}

@app.route('/stats', methods=['GET'])
def stats():
    try:
        return jsonify(stats_summary)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/analyse', methods=['POST'])
def analyze():
    # This endpoint expects a JSON "data" object
    data = request.get_json()
    
    # Validate that 'data' key exists
    if "data" not in data:
        return jsonify({"error": "Missing 'data' in request"}), 400

    try:
        # Extract the individual data points from the JSON
        features = data["data"]

        # Define the expected order of features based on the model's training
        expected_features = [
            'Age', 'Gender', 'Height', 'Weight', 'CALC', 'FAVC', 'FCVC', 'NCP', 
            'SCC', 'SMOKE', 'CH2O', 'family_history_with_overweight', 'FAF', 
            'TUE', 'CAEC', 'MTRANS'
        ]

        # Check if all features are present in the input
        if not all(feature in features for feature in expected_features):
            return jsonify({"error": "Missing or additional features in request"}), 400

        # Transform the dictionary into a DataFrame in the correct order
        input_df = pd.DataFrame([features], columns=expected_features)

        # Scale the input data using the loaded scaler
        scaled_input = scaler.transform(input_df)
        
        # Predict using the loaded model
        predictions = model.predict(scaled_input)

        # Construct response including both original data and prediction
        response_data = {
            "prediction_result": predictions.tolist()
        }
        
        # Return the response with the original data and prediction
        return jsonify(response_data)
    except KeyError as e:
        return jsonify({"error": f"Missing data for feature: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")