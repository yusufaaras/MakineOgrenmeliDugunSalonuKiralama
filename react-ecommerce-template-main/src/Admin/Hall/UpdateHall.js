import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateHall = () => {
  const { id } = useParams();
  const history = useHistory(); // useNavigate yerine useHistory kullanıyoruz.

  const [hall, setHall] = useState({
    id: id,
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
  });

  useEffect(() => {
    fetchHallDetails();
  }, [id]);

  const fetchHallDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:7072/api/WeddingHall/${id}`);
      setHall(response.data);
    } catch (error) {
      console.error("Salon bilgisi çekilirken hata oluştu:", error);
    }
  };

  const handleChange = (e) => {
    setHall({ ...hall, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7072/api/WeddingHall`, hall);
      alert("Salon başarıyla güncellendi!");
      history.push("/admin/Hall"); // Güncelleme sonrası yönlendirme
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  };

  return (
    <div className="container mt-4">
      <br />
      <br />
      <h2>Salon Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Salon Adı</label>
          <input type="text" className="form-control" name="name" value={hall.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Kapasite</label>
          <input type="number" className="form-control" name="capacity" value={hall.capacity} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Ana Resim URL</label>
          <input type="text" className="form-control" name="homeImageUrl" value={hall.homeImageUrl} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Detay Resim1 URL</label>
          <input type="text" className="form-control" name="homeImageUrl" value={hall.detailImageUrl1} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Detay Resim2 URL</label>
          <input type="text" className="form-control" name="homeImageUrl" value={hall.detailImageUrl2} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Detay Resim3 URL</label>
          <input type="text" className="form-control" name="homeImageUrl" value={hall.detailImageUrl3} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Detay Resim4 URL</label>
          <input type="text" className="form-control" name="homeImageUrl" value={hall.detailImageUrl4} onChange={handleChange} />
        </div>


        <div className="mb-3">
          <label className="form-label">Kısa Açıklama</label>
          <textarea className="form-control" name="shortDescription" value={hall.shortDescription} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Uzun Açıklama</label>
          <textarea className="form-control" name="longDescription" value={hall.longDescription} onChange={handleChange}></textarea>
        </div>
        

        <div className="mb-3">
            <label className="form-label">Fiyat</label> 
            <input
              type="number"
              className="form-control"
              name="Price"
              value={hall.Price}
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
              value={hall.PostalCode}
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
              value={hall.Alcohol}
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
              value={hall.CategoryName}
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
              value={hall.Cookie}
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
              value={hall.Food}
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
              value={hall.Country}
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
              value={hall.City}
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
              value={hall.Address}
              onChange={handleChange}
              required
            />
          </div>

        <button type="submit" className="btn btn-success">Güncelle</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => history.push("/admin/Hall")}>İptal</button>
      </form>
    </div>
  );
};

export default UpdateHall;