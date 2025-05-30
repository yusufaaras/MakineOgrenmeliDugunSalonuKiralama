import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const AddReservation = () => {
  const [formData, setFormData] = useState({
    weddingHallId: 1,         // Sabit veya dinamik değer verilebilir
    userId: 1,                // Kullanıcı sisteminize göre değiştirilebilir
    alcohol: "",
    cookie: "",
    name: "",
    surName: "",
    food: "",
    price: "",
    capacity: 0,
    bookingDate: new Date().toISOString(), // Güncel tarih
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7072/api/Booking", formData);
      alert("Rezervasyon başarıyla eklendi!");
      console.log("Yanıt:", response.data);
    } catch (error) {
      console.error("Hata:", error);
      alert("Rezervasyon eklenirken bir hata oluştu.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Rezervasyon Ekle</h2>
        <form onSubmit={handleSubmit}>
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
            <label className="form-label">Fiyat</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
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

          <button type="submit" className="btn btn-primary w-100">
            Rezervasyon Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReservation;
