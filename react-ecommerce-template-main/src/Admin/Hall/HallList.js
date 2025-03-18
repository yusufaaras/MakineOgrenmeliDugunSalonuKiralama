import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [locations, setLocations] = useState({});
  const [categories, setCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData();
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

  // Arama işlemi
  const filteredData = halls.filter(
    (hall) =>
      hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (locations[hall.locationId] &&
        locations[hall.locationId].toLowerCase().includes(searchTerm.toLowerCase())) ||
      (categories[hall.categoryId] &&
        categories[hall.categoryId].toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sıralama işlemi
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy] || "";
    const bValue = b[sortBy] || "";
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Düğün Salonları Listesi</h2>

      {/* Arama Kutusu */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Salon adı, konum veya kategori ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Yeni Salon Ekle Butonu */}
      <Link to="/admin/Hall/AddHall" className="btn btn-primary btn-sm mb-3">
        Yeni Salon Ekle
      </Link>

      {/* Tablo */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => setSortBy("id")} style={{ cursor: "pointer" }}>#</th>
            <th onClick={() => setSortBy("name")} style={{ cursor: "pointer" }}>Salon Adı</th>
            <th>Kapsite</th>
            <th>Konum</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((hall) => (
              <tr key={hall.id}>
                <td>{hall.id}</td>
                <td>{hall.name}</td>
                <td>{hall.capacity}</td>
                <td>{locations[hall.locationId] || "Bilinmiyor"}</td>
                <td>{categories[hall.categoryId] || "Bilinmiyor"}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Düzenle</button>
                  <button className="btn btn-danger btn-sm">Sil</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Sonuç bulunamadı</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HallList;
