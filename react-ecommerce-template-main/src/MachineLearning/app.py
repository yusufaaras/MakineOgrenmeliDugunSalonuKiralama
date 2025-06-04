from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("wedding_price_model.pkl")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = np.array([
            data['capacity'],
            data['location_index'],
            data['season'],
            data['food_service'],
            data['music_service'],
            data['extra_services']
        ]).reshape(1, -1)
        prediction = model.predict(features)[0]
        min_price = 3000  # Minimum fiyat kuralı
        prediction = max(prediction, min_price)
        return jsonify({'predicted_price': round(prediction, 2)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)