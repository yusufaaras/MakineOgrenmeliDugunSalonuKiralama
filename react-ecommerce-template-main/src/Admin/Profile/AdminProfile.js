import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

const AdminProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please login.");
      return;
    }

    try {
      // Token'dan kullanıcı ID'yi al
      const decodedToken = jwtDecode(token);
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      // API'ye istek at (Authorization header'ı ile)
      fetch(`https://localhost:7072/api/User/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token'ı header olarak ekle
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header text-center bg-primary text-white">
              <h3>Admin Profil Sayfası</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src="https://i.pinimg.com/736x/88/7b/7a/887b7aa9c15aad55ba34a938b32a6670.jpg" 
                    alt="Admin Avatar"
                    className="img-fluid rounded-circle mb-3"
                  />
                  <h4>{user.name} {user.surname}</h4>
                  <p className="text-muted">{user.username}</p>
                </div>
                <div className="col-md-8">
                  <h5>Hakkında</h5>
                  <p className="mb-1"><strong>Adı:</strong> {user.name}</p>
                  <p className="mb-1"><strong>Görevi:</strong> Yönetici</p>
                  <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                  <p className="mb-1"><strong>Telefon:</strong> +90 123 456 7890</p>
                  <p className="mb-1"><strong>Konum:</strong> İstanbul, Türkiye</p>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-warning">Profili Düzenle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
