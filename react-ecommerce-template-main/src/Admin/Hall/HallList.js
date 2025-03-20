import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import 'font-awesome/css/font-awesome.min.css';

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [locations, setLocations] = useState({});
  const [categories, setCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null); // Token'dan alınan kullanıcı ID

  useEffect(() => {
    fetchData();
    decodeToken();
  }, []);

  const fetchData = async () => {
    try {
      const hallsResponse = await axios.get("https://localhost:7072/api/WeddingHall");
      const locationsResponse = await axios.get("https://localhost:7072/api/Location");
      const categoriesResponse = await axios.get("https://localhost:7072/api/Categories");

      const locationsMap = {};
      locationsResponse.data.forEach((loc) => {
        locationsMap[loc.id] = `${loc.city}, ${loc.country}`;
      });

      const categoriesMap = {};
      categoriesResponse.data.forEach((cat) => {
        categoriesMap[cat.categoryId] = cat.name;
      });

      setHalls(hallsResponse.data);
      setLocations(locationsMap);
      setCategories(categoriesMap);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        // userId'yi token'dan al ve state'e kaydet
        setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      } catch (error) {
        console.error("Token çözme hatası:", error);
      }
    } else {
      console.warn("Token bulunamadı!");
    }
  };

  // Kullanıcının kendi salonlarını filtrele
  const filteredHalls = userId ? halls.filter((hall) => hall.userId == userId) : [];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Düğün Salonları Listesi</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Salon adı, konum veya kategori ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Link to="/admin/Hall/AddHall" className="btn btn-primary btn-sm mb-3">
        Yeni Salon Ekle
      </Link>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Salon Adı</th>
            <th>Kapsite</th>
            <th>Konum</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filteredHalls.length > 0 ? (
            filteredHalls.map((hall) => (
              <tr key={hall.id}>
                <td>{hall.id}</td>
                <td>{hall.name}</td>
                <td>{hall.capacity}</td>
                <td>{locations[hall.locationId] || "Bilinmiyor"}</td>
                <td>{categories[hall.categoryId] || "Bilinmiyor"}</td>
                <td>
                <button className="btn btn-primary btn-sm me-2">
                    <i className="fa fa-eye"></i> 
                  </button>
                  <button className="btn btn-warning btn-sm me-2">
                    <i className="fa fa-pencil"></i> 
                  </button>
                  <button className="btn btn-danger btn-sm me-2">
                    <i className="fa fa-trash"></i> 
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Sonuç bulunamadı</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HallList;
