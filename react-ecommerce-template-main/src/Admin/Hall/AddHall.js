import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";  // jwtDecode doğru import edilmelidir
import "bootstrap/dist/css/bootstrap.min.css";

const AddHall = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    homeImageUrl: "",
    detailImageUrl1: "",
    detailImageUrl2: "",
    detailImageUrl3: "",
    detailImageUrl4: "",
    shortDescription: "",
    longDescription: "",
    PostalCode: "",
    Address: "",
    Alcohol: "",
    CategoryName: "",
    City: "",
    Cookie: "",
    Country: "",
    Food: "",
    Price: "",
    userId: null, 
  });

  // Token'dan userId'yi al
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Çözümlenmiş Token:", decoded);

        // Token'dan gelen 'nameidentifier' alanını al ve userId'yi ayarla
        const tokenUserId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        if (tokenUserId) {
          // Token'dan gelen ID'yi formData'ya ekle
          setFormData((prev) => ({ ...prev, userId: tokenUserId }));
          console.log("Tokandan Gelen ID:", tokenUserId);
        }
      } catch (error) {
        console.error("Token çözme hatası:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Gönderilecek Veri:", formData);
    try {
      const response = await axios.post(
        "https://localhost:7072/api/WeddingHall",
        formData
      );
      alert("Salon başarıyla eklendi!");
      console.log("API Yanıtı:", response.data);
    } catch (error) {
      console.error("Hata oluştu:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Salon Ekle</h2>
        <form onSubmit={handleSubmit}>
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
            <label className="form-label">Ana Resim URL</label>
            <input
              type="text"
              className="form-control"
              name="homeImageUrl"
              value={formData.homeImageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Detay Resim 1 URL</label>
            <input
              type="text"
              className="form-control"
              name="detailImageUrl1"
              value={formData.detailImageUrl1}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Detay Resim 2 URL</label>
            <input
              type="text"
              className="form-control"
              name="detailImageUrl2"
              value={formData.detailImageUrl2}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Detay Resim 3 URL</label>
            <input
              type="text"
              className="form-control"
              name="detailImageUrl3"
              value={formData.detailImageUrl3}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Detay Resim 4 URL</label>
            <input
              type="text"
              className="form-control"
              name="detailImageUrl4"
              value={formData.detailImageUrl4}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kısa Açıklama</label>
            <input
              type="text"
              className="form-control"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Uzun Açıklama</label>
            <textarea
              className="form-control"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fiyat</label>
            <input
              type="number"
              className="form-control"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Posta Kodu</label>
            <input
              type="number"
              className="form-control"
              name="PostalCode"
              value={formData.PostalCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Alkol Var mı?</label>
            <input
              type="text"
              className="form-control"
              name="Alcohol"
              value={formData.Alcohol}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Kategori</label>
            <input
              type="text"
              className="form-control"
              name="CategoryName"
              value={formData.CategoryName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Çerez Var Mı?</label>
            <input
              type="text"
              className="form-control"
              name="Cookie"
              value={formData.Cookie}
              onChange={handleChange}
              required
            />
          </div>



          <div className="mb-3">
            <label className="form-label">Yemek Var Mı?</label>
            <input
              type="text"
              className="form-control"
              name="Food"
              value={formData.Food}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ülke</label>
            <input
              type="text"
              className="form-control"
              name="Country"
              value={formData.Country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Şehir</label>
            <input
              type="text"
              className="form-control"
              name="City"
              value={formData.City}
              onChange={handleChange}
              required
            />
          </div>



          <div className="mb-3">
            <label className="form-label">Adres</label>
            <input
              type="text"
              className="form-control"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Salon Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHall;
