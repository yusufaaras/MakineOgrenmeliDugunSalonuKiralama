import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import AdminTemplade from "./admintemplade"


const AdminPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = userData.token;
        const decodedToken = jwtDecode(token);  // Token'ı decode et
        const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        const response = await axios.get(`https://localhost:7072/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        });

        setUserData(response.data);

        // Kullanıcı admin değilse ana sayfaya yönlendir
        if (response.data.appRoleID !== 1) {
          alert("Bu sayfaya erişim yetkiniz yok!");
          history.push("/");
          return;
        }

        // Tüm kullanıcıları listele
        const usersResponse = await axios.get(`https://localhost:7072/api/User/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(usersResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Hata detayları:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          headers: err.response?.headers,
          config: err.config
        });
        setError("Veri yüklenirken bir hata oluştu.");
        setLoading(false);
      };

      fetchData();
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://localhost:7072/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Kullanıcı listesini güncelle
        setUsers(users.filter(user => user.id !== userId));
        alert("Kullanıcı başarıyla silindi!");
      } catch (err) {
        alert("Kullanıcı silinirken bir hata oluştu.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <AdminTemplade />
    </div>
  );
};

export default AdminPage;