import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Reservation = () => {
  // Örnek tablo verileri
  const [data, setData] = useState([
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "Admin" },
    { id: 2, name: "Zeynep Demir", email: "zeynep@example.com", role: "User" },
    { id: 3, name: "Mehmet Kaya", email: "mehmet@example.com", role: "Editor" },
    { id: 4, name: "Elif Karaca", email: "elif@example.com", role: "User" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Arama işlemi
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sıralama işlemi
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  return (
    <div className="container mt-4">
      <br/>
      <br/>
      <h2 className="mb-3">Rezervasyon Listesi</h2>

      {/* Arama Kutusu */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Arama yap..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tablo */}
      
      <Link to="/admin/Reservation/AddReservation" className="btn btn-primary btn-sm me-2">
            Yeni Salon Ekle
        </Link>
      <br/>
      <br/>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => setSortBy("id")} style={{ cursor: "pointer" }}>#</th>
            <th onClick={() => setSortBy("name")} style={{ cursor: "pointer" }}>İsim</th>
            <th onClick={() => setSortBy("email")} style={{ cursor: "pointer" }}>E-Posta</th>
            <th onClick={() => setSortBy("role")} style={{ cursor: "pointer" }}>Rol</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Düzenle</button>
                  <button className="btn btn-danger btn-sm">Sil</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Sonuç bulunamadı</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reservation;
