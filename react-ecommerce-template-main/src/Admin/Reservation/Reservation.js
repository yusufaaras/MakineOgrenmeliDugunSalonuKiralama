import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Reservation = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userId, setUserId] = useState(null);

  // JWT'den userId çek
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const tokenUserId =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        setUserId(tokenUserId ? String(tokenUserId) : null);
      } catch (error) {
        console.error("Token çözme hatası:", error);
      }
    }
  }, []);

  // API'den veri çekme
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7072/api/Booking");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("API'den veri çekilirken hata oluştu:", error);
    }
  };

  // Silme fonksiyonu
  const handleDelete = async (id) => {
    if (window.confirm("Bu rezervasyonu silmek istediğinize emin misiniz?")) {
      try {
        const response = await fetch(`https://localhost:7072/api/Booking/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
        } else {
          alert("Silme işlemi başarısız oldu!");
        }
      } catch (error) {
        alert("Silme işlemi sırasında hata oluştu!");
        console.error(error);
      }
    }
  };

  // Sadece giriş yapan kullanıcıya ait rezervasyonlar
  const userBookings = data.filter(
    (item) => userId && String(item.userId) === String(userId)
  );

  // Arama işlemi
  const filteredData = userBookings.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.surName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.food?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <br />
      <br />
      <h2 className="mb-3">Rezervasyon Listesi</h2>

      {/* Arama Kutusu */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Arama yap..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Yeni Rezervasyon Ekleme Linki */}
      <Link to="/admin/Reservation/AddReservation" className="btn btn-primary btn-sm me-2">
        <i className="fa fa-plus"></i> Yeni Ekle
      </Link>
      <br />

      {/* Tablo */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={() => setSortBy("id")} style={{ cursor: "pointer" }}>#</th>
            <th onClick={() => setSortBy("name")} style={{ cursor: "pointer" }}>Ad</th>
            <th onClick={() => setSortBy("surName")} style={{ cursor: "pointer" }}>Soyad</th>
            <th onClick={() => setSortBy("food")} style={{ cursor: "pointer" }}>Yemek</th>
            <th onClick={() => setSortBy("price")} style={{ cursor: "pointer" }}>Fiyat</th>
            <th onClick={() => setSortBy("capacity")} style={{ cursor: "pointer" }}>Kapasite</th>
            <th onClick={() => setSortBy("bookingDate")} style={{ cursor: "pointer" }}>Rezervasyon Tarihi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.name || "Belirtilmedi"}</td>
                <td>{reservation.surName || "Belirtilmedi"}</td>
                <td>{reservation.food || "Belirtilmedi"}</td>
                <td>{reservation.price || "Belirtilmedi"}</td>
                <td>{reservation.capacity}</td>
                <td>{new Date(reservation.bookingDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">Sonuç bulunamadı</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reservation;