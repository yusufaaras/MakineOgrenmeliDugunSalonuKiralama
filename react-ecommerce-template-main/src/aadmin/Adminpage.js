import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

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
  }}, [history]);

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
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3>Admin Paneli</h3>
              <button className="btn btn-danger" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </div>
            <div className="card-body">
              {userData && (
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h4>Hoş Geldiniz, {userData.name} {userData.surname}</h4>
                    <p>Email: {userData.email}</p>
                    <p>Kullanıcı Adı: {userData.username}</p>
                  </div>
                </div>
              )}
              
              <hr />
              
              <h4 className="mb-3">Kullanıcı Yönetimi</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Kullanıcı Adı</th>
                      <th>İsim</th>
                      <th>Soyisim</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.appRoleID === 1 ? (
                            <span className="badge bg-danger">Admin</span>
                          ) : (
                            <span className="badge bg-success">Kullanıcı</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => history.push(`/edit-user/${user.id}`)}
                          >
                            Düzenle
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;