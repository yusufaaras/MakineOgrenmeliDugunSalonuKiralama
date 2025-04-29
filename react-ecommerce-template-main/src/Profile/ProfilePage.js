import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please login.");
      setError("Oturum açmanız gerekiyor.");
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      fetch(`https://localhost:7072/api/User/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(`Kullanıcı verisi alınamadı: ${response.status} - ${err?.message || response.statusText}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Kullanıcı verisi alınırken hata:", err);
          setError("Kullanıcı verileri yüklenirken bir hata oluştu.");
          setLoading(false);
        });
    } catch (err) {
      console.error("Token çözümlenirken hata:", err);
      setError("Oturum bilgisi doğrulanamadı.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Yükleniyor...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  if (user && user.role === 2) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg p-4 text-center">
              <h3 className="mb-1">{user.name} {user.surname}</h3>
              <p className="text-muted">@{user.username}</p>
              <p className="text-muted">{user.email}</p>
              <button
                className="btn btn-danger mt-3"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/AuthPage";
                }}
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg p-4 text-center">
              <p className="text-warning">Bu sayfayı görüntüleme yetkiniz bulunmuyor.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfilePage;