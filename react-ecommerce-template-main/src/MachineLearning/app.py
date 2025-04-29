from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

# Flask uygulamasını başlat
app = Flask(__name__)

# Eğitilmiş modeli yükle
model = joblib.load("wedding_price_model.pkl")

# Ana sayfa
@app.route('/')
def home():
    return render_template('index.html')

# Tahmin API'si
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # JSON verisini al
        data = request.json
        
        # Özellikleri al ve numpy array'e dönüştür
        features = np.array([
            data['capacity'], 
            data['location_index'], 
            data['season'], 
            data['food_service'], 
            data['music_service'], 
            data['extra_services']
        ]).reshape(1, -1)
        
        # Tahmin yap
        prediction = model.predict(features)[0]
        
        # Sonucu döndür
        return jsonify({'predicted_price': round(prediction, 2)})
    except Exception as e:
        return jsonify({'error': str(e)})

# Flask uygulamasını çalıştır
if __name__ == '__main__':
    app.run(debug=True)