import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddReservation= () => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Salon Eklendi:", formData);
    alert("Salon başarıyla eklendi!");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Salon Ekle</h2>
        <form onSubmit={handleSubmit}>
          {/* Salon Adı */}
          <div className="mb-3">
            <label className="form-label">Salon Adı</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Kapasite */}
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

          {/* Açıklama */}
          <div className="mb-3">
            <label className="form-label">Açıklama</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          {/* Kaydet Butonu */}
          <button type="submit" className="btn btn-primary w-100">
            Salon Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReservation;
