import joblib
import numpy as np
from sklearn.linear_model import LinearRegression

# Örnek eğitim verisi
X = np.array([
    [100, 5, 1, 1, 1, 2],
    [200, 7, 1, 1, 0, 3],
    [300, 6, 0, 1, 1, 1],
    [400, 8, 1, 0, 1, 4],
    [500, 9, 0, 1, 0, 5]
])  

y = np.array([2000, 3000, 4000, 5000, 6000])  # Fiyat

# Modeli eğit
model = LinearRegression()
model.fit(X, y)

# Modeli kaydet
joblib.dump(model, "wedding_price_model.pkl")

print("Model başarıyla kaydedildi: wedding_price_model.pkl")