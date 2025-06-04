import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor

# Geniş ve mantıklı bir örnek veri seti üretelim (daha fazlasını da ekleyebilirsin)
# [kapasite, lokasyon, sezon, yemek, çerez, ekstra hizmet]
X = []
y = []
for capacity in [100, 200, 300, 400, 500, 600, 800, 1000]:
    for location in [1, 3, 5, 7, 10]:
        for season in [0, 1]:
            for food in [0, 1]:
                for music in [0, 1]:
                    for extra in [0, 1, 2, 3, 4, 5]:
                        base = 1000 + capacity * 5 + location * 250
                        if season == 1:
                            base += 2000  # yüksek sezonda artış
                        if food:
                            base += 2000
                        if music:
                            base += 500
                        base += extra * 400
                        X.append([capacity, location, season, food, music, extra])
                        y.append(base)

X = np.array(X)
y = np.array(y)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

joblib.dump(model, "wedding_price_model.pkl")
print("Yeni model başarıyla kaydedildi.")