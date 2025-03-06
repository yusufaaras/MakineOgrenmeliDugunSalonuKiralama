import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7072/api/User")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUser(data[0]); // İlk kullanıcıyı al
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  if (!user) {
    return <p className="text-center mt-5">Loading...</p>;
  }
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4 text-center">
            {/* Profil Animasyon Videosu */}
            <video 
              className="rounded-circle img-thumbnail mb-3"
              width="100%"
              autoPlay
              loop
              muted
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Tarayıcınız video etiketini desteklemiyor.
            </video>

            {/* Kullanıcı Bilgileri */}
            <h3 className="mb-1">{user.name} {user.surname}</h3>
            <p className="text-muted">@{user.username}</p>
            <p className="text-muted">{user.email}</p>

            {/* Profil İçeriği */}
            <div className="mt-4">
              <h5>Profile Information</h5>
              <p>Role: {user.appUserID}</p>
            </div>

            {/* Butonlar */}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-primary">Profili Düzenle</button>
              <button className="btn btn-danger">Çıkış Yap</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
