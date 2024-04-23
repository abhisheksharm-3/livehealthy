import json
import requests

# Sample data dictionary with values for each feature
data = {
    "Gender": 3,  # Male
    "Age": 25,  # Example age
    "Height": 175.0,  # Example height in cm
    "Weight": 70.0,  # Example weight in kg
    "family_history_with_overweight": 3,  # yes
    "FAVC": 3,  # yes
    "FCVC": 2,  # Example integer value for vegetable consumption frequency
    "NCP": 3,  # Number of main meals
    "CAEC": 3,  # Sometimes
    "SMOKE": 2,  # no
    "CH2O": 2.0,  # Example liters of water per day
    "SCC": 2,  # no
    "FAF": 0.5,  # Frequency of physical activity
    "TUE": 4,  # Time using technology devices
    "CALC": 3,  # Sometimes
    "MTRANS": 5  # Public_Transportation
}

# Convert the dictionary to a JSON string
json_data = json.dumps(data)

# Print the JSON string
print(json_data)

# URL of the server endpoint that accepts the JSON data
url = "http://yourserver.com/api/endpoint"

# Headers to indicate that you are sending JSON
headers = {
    'Content-Type': 'application/json'
}

# Send POST request with JSON data
response = requests.post(url, headers=headers, data=json_data)

# Print the server's response
print(response.text)
