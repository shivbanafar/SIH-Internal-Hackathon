from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from data_preprocessing import preprocess_data
from models.predictive_model import PredictiveModel

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Load and preprocess data
X_train, X_test, y_train, y_test, scaler = preprocess_data()

# Train the model
model = PredictiveModel()
model.train(X_train, y_train)

@app.route('/api/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        # Handling preflight request
        response = app.make_default_options_response()
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Convert data to the format expected by your model
        input_data = pd.DataFrame({
            'age': [float(data['age'])],
            'bmi': [float(data['bmi'])],
            'blood_pressure': [float(data['blood_pressure'])],
            'cholesterol': [float(data['cholesterol'])],
            'smoking': [int(data['smoking'])]
        })

        scaled_input = scaler.transform(input_data)
        prediction = model.predict(scaled_input)[0]
        risk_level = 'High' if prediction == 1 else 'Low'
        return jsonify({'risk_level': risk_level})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# from data_preprocessing import preprocess_data
# from models.predictive_model import PredictiveModel

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# # Load and preprocess data
# X_train, X_test, y_train, y_test, scaler = preprocess_data()

# # Train the model
# model = PredictiveModel()
# model.train(X_train, y_train)

# @app.route('/api/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.json
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         input_data = pd.DataFrame(data, index=[0])
#         scaled_input = scaler.transform(input_data)
#         prediction = model.predict(scaled_input)[0]
#         risk_level = 'High' if prediction == 1 else 'Low'
#         return jsonify({'risk_level': risk_level})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)


















# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# from data_preprocessing import preprocess_data
# from models.predictive_model import PredictiveModel

# app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# # Load and preprocess data
# X_train, X_test, y_train, y_test, scaler = preprocess_data()

# # Train the model
# model = PredictiveModel()
# model.train(X_train, y_train)

# @app.route('/api/predict', methods=['POST'])
# def predict():
#     data = request.json
#     input_data = pd.DataFrame(data, index=[0])
#     scaled_input = scaler.transform(input_data)
#     prediction = model.predict(scaled_input)[0]
#     risk_level = 'High' if prediction == 1 else 'Low'
#     return jsonify({'risk_level': risk_level})

# if __name__ == '__main__':
#     app.run(debug=True)