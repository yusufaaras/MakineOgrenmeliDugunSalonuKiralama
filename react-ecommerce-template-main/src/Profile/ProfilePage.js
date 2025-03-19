import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


const ProfilePage = () => {
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
          <div className="card shadow-lg p-4 text-center">
            <h3 className="mb-1">{user.name} {user.surname}</h3>
            <p className="text-muted">@{user.username}</p>
            <p className="text-muted">{user.email}</p>
            <button className="btn btn-danger mt-3" onClick={() => {
              localStorage.removeItem("token"); // Çıkış yapınca token'ı sil
              window.location.href = "/AuthPage";
            }}>
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
