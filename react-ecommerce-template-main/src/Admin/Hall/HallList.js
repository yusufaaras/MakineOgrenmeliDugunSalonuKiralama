import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import 'font-awesome/css/font-awesome.min.css';
import { Modal, Button } from "react-bootstrap";

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);

  useEffect(() => {
    fetchData();
    decodeToken();
  }, []);

  const fetchData = async () => {
    try {
      const hallsResponse = await axios.get("https://localhost:7072/api/WeddingHall");
      setHalls(hallsResponse.data);
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

  // Arama işlemi
  const searchHalls = filteredHalls.filter(
    (hall) =>
      hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hall.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal açma
  const handleShowModal = (hall) => {
    setSelectedHall(hall);
    setShowModal(true);
  };

  // Modal kapatma
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHall(null);
  };

  // Salon silme işlemi
  const deleteHall = async () => {
    if (!selectedHall) return;
    try {
      await axios.delete(`https://localhost:7072/api/WeddingHall/${selectedHall.id}`);
      alert("Salon başarıyla silindi!");
      setHalls((prevHalls) => prevHalls.filter((hall) => hall.id !== selectedHall.id)); // UI güncelle
    } catch (error) {
      console.error("Salon silme hatası:", error);
      alert("Salon silinirken hata oluştu!");
    }
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <br />
      <br />
      <h2 className="mb-3">Düğün Salonları Listesi</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Salon adı veya açıklama ara..."
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
            <th>Kısa Açıklama</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {searchHalls.length > 0 ? (
            searchHalls.map((hall) => (
              <tr key={hall.id}>
                <td>{hall.id}</td>
                <td>{hall.name}</td>
                <td>{hall.capacity}</td>
                <td>{hall.shortDescription}</td>
                <td>
                  <Link to={`/products/${hall.id}`} className="btn btn-primary btn-sm me-2">
                    <i className="fa fa-eye"></i>
                  </Link>
                  <Link to={`/admin/Hall/UpdateHall/${hall.id}`} className="btn btn-warning btn-sm me-2">
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => handleShowModal(hall)}>
                    <i className="fa fa-trash"></i>
                  </button>
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

      {/* Silme Onay Modali */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Silme Onayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>{selectedHall?.name}</strong> salonunu silmek istediğinize emin misiniz?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Vazgeç
          </Button>
          <Button variant="danger" onClick={deleteHall}>
            Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HallList;