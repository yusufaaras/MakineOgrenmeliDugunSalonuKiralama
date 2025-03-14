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

  return(
    <div>
     <header className="bg-dark text-white p-3 shadow-md">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Sol kısım: Logo / Başlık */}
        <h2 className="m-0">
          <Link to="/admin" className="text-white text-decoration-none">
            Admin Panel
          </Link>
        </h2>

        {/* Orta kısım: Navigasyon */}
        <nav>
          <Link to="/admin/dashboard" className="text-white mx-3 text-decoration-none">Dashboard</Link>
          <Link to="/admin/users" className="text-white mx-3 text-decoration-none">Kullanıcılar</Link>
          <Link to="/admin/settings" className="text-white mx-3 text-decoration-none">Ayarlar</Link>
        </nav>

        {/* Sağ kısım: Çıkış Butonu */}
        <button className="btn btn-danger" onClick={handleLogout}>Çıkış Yap</button>
      </div>
    </header>   
    </div>
  )}