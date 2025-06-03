import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddReservation = () => {
  const [formData, setFormData] = useState({
    weddingHallId: "",
    userId: "",
    alcohol: "",
    cookie: "",
    name: "",
    surName: "",
    food: "",
    session: "",
    price: "",
    capacity: 0,
    bookingDate: new Date().toISOString(),
  });

  const [weddingHalls, setWeddingHalls] = useState([]);
  const [userWeddingHalls, setUserWeddingHalls] = useState([]);
  const [bookedMap, setBookedMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Token'dan userId alma
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const tokenUserId =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        if (tokenUserId) {
          setFormData((prev) => ({
            ...prev,
            userId: tokenUserId,
          }));
        }
      } catch (error) {
        console.error("Token çözme hatası:", error);
      }
    }
  }, []);

  // Wedding Hall ve rezervasyonları çekme
  useEffect(() => {
    const fetchData = async () => {
      try {
        const hallsRes = await axios.get("https://localhost:7072/api/WeddingHall");
        setWeddingHalls(hallsRes.data);

        if (formData.userId) {
          const userHalls = hallsRes.data.filter(
            (h) => String(h.userId) === String(formData.userId)
          );
          setUserWeddingHalls(userHalls);

          // Her Wedding Hall için rezervasyonları çek
          const bookingPromises = userHalls.map((hall) =>
            axios.get(
              `https://localhost:7072/api/Booking?weddingHallId=${hall.id}`
            )
          );
          const bookingsArr = await Promise.allSettled(bookingPromises);

          // Booked map'i oluştur: { hallId: [date1, date2, ...] }
          const map = {};
          bookingsArr.forEach((result, idx) => {
            if (result.status === "fulfilled") {
              map[userHalls[idx].id] = result.value.data.map(
                (b) => b.bookingDate
              );
            } else {
              map[userHalls[idx].id] = [];
            }
          });
          setBookedMap(map);
        }
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // formData.userId değişirse tekrar çek
  }, [formData.userId]);

  // Tarih değişince, weddingHallId'yi sıfırla (çünkü o tarihte dolu olabilir)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      weddingHallId: "",
      capacity: 0,
      price: "",
    }));
  }, [formData.bookingDate]);

  // Düğün salonu değiştiğinde kapasite ve fiyatı çek
  const handleWeddingHallChange = (e) => {
    const selectedId = e.target.value;
    const selectedHall = userWeddingHalls.find(h => String(h.id) === String(selectedId));

    setFormData((prev) => ({
      ...prev,
      weddingHallId: selectedId,
      capacity: selectedHall ? selectedHall.capacity : 0,
      price: selectedHall ? selectedHall.price : "",
    }));
  };

  // Belirli wedding hall id ve seçili tarihte rezervasyon var mı
  const isWeddingHallReserved = (weddingHallId, selectedDate) => {
    const reservedDates = bookedMap[weddingHallId] || [];
    const selected = new Date(selectedDate).toISOString().slice(0, 16);
    return reservedDates.some((date) =>
      date.slice(0, 16) === selected
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API'nin beklediği tiplerde gönderiyoruz
    const preparedData = {
      ...formData,
      weddingHallId: Number(formData.weddingHallId),
      userId: Number(formData.userId),
      capacity: Number(formData.capacity),
    };

    try {
      await axios.post("https://localhost:7072/api/Booking", preparedData);
      alert("Rezervasyon başarıyla eklendi!");
      // Formu sıfırla
      setFormData((prev) => ({
        ...prev,
        weddingHallId: "",
        alcohol: "",
        cookie: "",
        name: "",
        surName: "",
        food: "",
        session: "",
        price: "",
        capacity: 0,
        bookingDate: new Date().toISOString(),
      }));
    } catch (error) {
      if (error.response) {
        console.error("Sunucu Yanıtı:", error.response.data);
        alert("Hata: " + JSON.stringify(error.response.data));
      } else {
        console.error("Hata:", error.message);
        alert("Bilinmeyen hata: " + error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Rezervasyon Ekle</h2>
        {loading ? (
          <div>Yükleniyor...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Düğün Salonu Seçiniz</label>
              <select
                className="form-select"
                name="weddingHallId"
                value={formData.weddingHallId}
                onChange={handleWeddingHallChange}
                required
              >
                <option value="">Salon Seçiniz</option>
                {userWeddingHalls.map((hall) => (
                  <option
                    key={hall.id}
                    value={hall.id}
                    disabled={isWeddingHallReserved(
                      hall.id,
                      formData.bookingDate
                    )}
                  >
                    {hall.name}
                    {isWeddingHallReserved(hall.id, formData.bookingDate)
                      ? " (Bu tarihte dolu)"
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Ad</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Soyad</label>
              <input
                type="text"
                className="form-control"
                name="surName"
                value={formData.surName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Kapasite</label>
              <input
                type="number"
                className="form-control"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                readOnly // Salon seçili iken kullanıcı değiştiremesin
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Yemek</label>
              <input
                type="text"
                className="form-control"
                name="food"
                value={formData.food}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Alkol</label>
              <input
                type="text"
                className="form-control"
                name="alcohol"
                value={formData.alcohol}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Kurabiye</label>
              <input
                type="text"
                className="form-control"
                name="cookie"
                value={formData.cookie}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Oturum</label>
              <input
                type="text"
                className="form-control"
                name="session"
                value={formData.session}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fiyat</label>
              <input
                type="text"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                readOnly // Salon seçili iken kullanıcı değiştiremesin
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tarih</label>
              <input
                type="datetime-local"
                className="form-control"
                name="bookingDate"
                value={formData.bookingDate.slice(0, 16)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bookingDate: new Date(e.target.value).toISOString(),
                  }))
                }
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={
                !formData.weddingHallId ||
                isWeddingHallReserved(formData.weddingHallId, formData.bookingDate)
              }
            >
              Rezervasyon Ekle
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddReservation;