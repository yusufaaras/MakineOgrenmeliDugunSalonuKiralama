import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const MENU_ITEMS = [
  { key: "profile", label: "Profil" },
  { key: "past_reservations", label: "Geçmiş Rezervasyonlar" },
  { key: "active_reservations", label: "Aktif Rezervasyonlar" },
  { key: "settings", label: "Ayarlar" },
];

const ProfileDetails = ({ user }) => (<>
  <br/><br/><br/><div className="profile-details">
    <h2>Profil Bilgileri</h2>
    <div className="profile-container">
      <div className="profile-avatar">
        <div className="default-avatar">
          {(user.name?.[0] || "") + (user.surname?.[0] || "")}
        </div>
      </div>
      <div className="profile-info">
        <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
        <p><strong>Ad:</strong> {user.name}</p>
        <p><strong>Soyad:</strong> {user.surname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Kayıt Tipi:</strong> {user.appRoleID === 2 ? "Bireysel" : "Salon Sahibi"}</p>
      </div>
    </div>
  </div></>
  
);

// --- Aktif Rezervasyonlar için tabloya iptal butonu ekliyoruz ---
const ReservationsList = ({ reservations, title, onCancel }) => (
  <>
  <br/><br/><br/><div className="reservations-list">
    <h2>{title}</h2>
    {reservations?.length === 0 ? (
      <p>Rezervasyon bulunamadı.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Salon ID</th>
            <th>Tarih</th>
            <th>Kapasite</th>
            <th>Toplam Ücret</th>
            <th>Yiyecek</th>
            <th>Alkol</th>
            <th>Kurabiye</th>
            <th>Ad</th>
            <th>Soyad</th>
            {onCancel && <th>İşlem</th>}
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.weddingHallId}</td>
              <td>{new Date(r.bookingDate).toLocaleString()}</td>
              <td>{r.capacity}</td>
              <td>{r.price} TL</td>
              <td>{r.food}</td>
              <td>{r.alcohol}</td>
              <td>{r.cookie}</td>
              <td>{r.name}</td>
              <td>{r.surName}</td>
              {onCancel && (
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onCancel(r.id)}
                  >
                    Rezervasyonu İptal Et
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div></>
);

const Settings = ({ user, onUpdate }) => {
  const [form, setForm] = useState({
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    password: "",
  });
  const [info, setInfo] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setInfo("");
    try {
      // PUT /api/User
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7072/api/User", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          appUserID: user.appUserID,
          username: user.username,
          password: form.password || user.password,
          name: form.name,
          surname: form.surname,
          email: form.email,
          appRoleID: user.appRoleID,
        }),
      });
      if (!response.ok) {
        throw new Error("Bilgiler güncellenemedi.");
      }
      setInfo("Bilgileriniz başarıyla güncellendi.");
      onUpdate();
    } catch (err) {
      setInfo("Güncelleme başarısız: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
    <br/><br/><br/><div className="settings">
      <h2>Ayarlar</h2>
      <div className="settings-form">
        <label>
          <span>Ad:</span>
          <input name="name" type="text" value={form.name} onChange={handleChange} />
        </label>
        <label>
          <span>Soyad:</span>
          <input name="surname" type="text" value={form.surname} onChange={handleChange} />
        </label>
        <label>
          <span>Email:</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          <span>Yeni Şifre:</span>
          <input name="password" type="password" placeholder="Yeni şifre" value={form.password} onChange={handleChange} />
        </label>
        <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
        </button>
        {info && <div className="settings-info">{info}</div>}
      </div>
    </div></>
    
  );
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [reservations, setReservations] = useState({
    past: [],
    active: [],
  });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/AuthPage";
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      // Kullanıcı bilgisi
      fetch(`https://localhost:7072/api/User/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user data:", error));

      // Kullanıcı rezervasyonları
      fetch(`https://localhost:7072/api/Booking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          const userReservations = resData.filter(
            (r) => String(r.userId) === String(userId)
          );
          const now = new Date();
          setReservations({
            past: userReservations.filter(
              (r) => new Date(r.bookingDate) < now
            ),
            active: userReservations.filter(
              (r) => new Date(r.bookingDate) >= now
            ),
          });
        })
        .catch((error) => console.error("Error fetching reservations:", error));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    // eslint-disable-next-line
  }, [reload]);

  // REZERVASYONU İPTAL ETMEK İÇİN FONKSİYON
  const handleCancel = (bookingId) => {
    if (!window.confirm("Rezervasyonu iptal etmek istediğinize emin misiniz?")) return;
    const token = localStorage.getItem("token");
    fetch(`https://localhost:7072/api/Booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Rezervasyon silinemedi!");
        setReload((r) => !r);
      })
      .catch((err) => {
        alert("Rezervasyon silinirken hata oluştu!");
      });
  };

  if (!user) {
    return (
      <div className="loading">
        <span>Yükleniyor...</span>
      </div>
    );
  }

  let content;
  switch (selectedMenu) {
    case "profile":
      content = <ProfileDetails user={user} />;
      break;
    case "past_reservations":
      content = (
        <ReservationsList
          reservations={reservations.past}
          title="Geçmiş Rezervasyonlar"
        />
      );
      break;
    case "active_reservations":
      content = (
        <ReservationsList
          reservations={reservations.active}
          title="Aktif Rezervasyonlar"
          onCancel={handleCancel}
        />
      );
      break;
    case "settings":
      content = <Settings user={user} onUpdate={() => setReload(!reload)} />;
      break;
    default:
      content = null;
  }

  return (<>
    <br/><br/><br/><div className="profile-page-root">
      <br/><br/><br/>
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            {MENU_ITEMS.map((item) => (
              <li
                key={item.key}
                className={selectedMenu === item.key ? "selected" : ""}
                onClick={() => setSelectedMenu(item.key)}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <button
            className="btn btn-danger mt-3"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/AuthPage";
            }}
          >
            Çıkış Yap
          </button>
        </nav>
      </aside>
      <main className="profile-main-content">{content}</main>
      <style>{`
        .profile-page-root {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f5f6fa;
        }
        .sidebar {
          width: 235px;
          min-width: 200px;
          background: #252945;
          color: #fff;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
        }
        .sidebar-nav {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .sidebar-nav ul li {
          flex: 1;
          padding: 0.72rem 1.25rem;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          font-size: 0.97rem;
          display: flex;
          align-items: center;
          color: #d1d4e3;
          background: #252945;
          border: none;
          border-left: .18rem solid transparent;
          letter-spacing: 0.01rem;
        }
        .sidebar-nav ul li.selected {
          background: #23242c;
          color: #fff;
          border-left: .18rem solid #3867d6;
        }
        .sidebar-nav ul li:hover:not(.selected) {
          background: #333652;
          color: #fff;
        }
        .sidebar-nav ul li:first-child.selected {
          background: #333652;
          color: #fff;
          border-left: .18rem solid #3867d6;
        }
        .btn {
          margin: 1.1rem;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          border: none;
          font-size: .99rem;
          cursor: pointer;
        }
        .btn-danger {
          background: #e84118;
          color: #fff;
        }
        .btn-danger:hover {
          background: #c23616;
        }
        .btn-primary {
          background: #3867d6;
          color: #fff;
        }
        .btn-sm {
          padding: 0.2rem 0.5rem;
          font-size: 0.93rem;
        }
        .profile-main-content {
          flex: 1;
          padding: 2rem 3rem;
          background: #fff;
          min-height: 100vh;
        }
        .profile-details .profile-container {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
        }
        .profile-avatar {
          width: 110px;
          height: 110px;
          border-radius: 55px;
          overflow: hidden;
          background: #dcdde1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: bold;
          color: #3867d6;
        }
        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-info p {
          margin: 0.5rem 0;
        }
        .reservations-list table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          font-size: 0.99rem;
        }
        .reservations-list th, .reservations-list td {
          border: 1px solid #eee;
          padding: 0.6rem;
          text-align: left;
        }
        .reservations-list th {
          background: #f1f2f6;
        }
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          max-width: 400px;
        }
        .settings-form label {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1rem;
        }
        .settings-form input {
          flex: 1;
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ddd;
          font-size: 1rem;
        }
        .settings-info {
          margin-top: 1rem;
          font-size: 0.98rem;
          color: #22a06b;
        }
        .loading {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
        }
        @media (max-width: 800px) {
          .profile-page-root {
            flex-direction: column;
          }
          .sidebar {
            flex-direction: row;
            min-width: 0;
            width: 100%;
            height: auto;
            position: static;
          }
          .sidebar-nav ul {
            flex-direction: row;
          }
          .sidebar-nav ul li {
            padding: 0.6rem 0.7rem;
            flex: 1 1 0;
            justify-content: center;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div></>
    
  );
};

export default ProfilePage;