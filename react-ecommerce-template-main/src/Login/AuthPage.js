import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "https://localhost:7072/api/Logins" : "https://localhost:7072/api/Registers";

    try {
      const response = await axios.post(url, formData);
      const userData = response.data;

      // Token'ı localStorage'a kaydet
      localStorage.setItem("token", userData.token);

      // Token'dan giriş yapan kullanıcı bilgilerini al
      const token = userData.token;
      const decodedToken = jwtDecode(token);  // Token'ı decode et
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      // Kullanıcı bilgilerini al
      const userResponse = await axios.get(`https://localhost:7072/api/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Token'ı header olarak ekle
        },
      });

      const user = userResponse.data;  // Kullanıcı verilerini al

      console.log('Alınan appRoleId:', user.appRoleID);  

      // appRoleId'yi kontrol et
      if (user.appRoleID === 2) {  
        alert("Giriş başarılı!");
        history.push("/profile");
      } else {
        alert("Yetkisiz giriş! Profile erişiminiz yok.");
        localStorage.removeItem("token"); // Token'ı sil
      }
    } catch (error) {
      alert("Hata: " + (error.response?.data?.message || "Bir şeyler yanlış gitti"));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center">{isLogin ? "Login" : "Register"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" name="username" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleChange} required />
              </div>
              {!isLogin && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Surname</label>
                    <input type="text" name="surname" className="form-control" onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                  </div>
                </>
              )}
              <button type="submit" className="btn btn-primary w-100">{isLogin ? "Login" : "Register"}</button>
            </form>
            <p className="text-center mt-3">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>

            <p className="text-center mt-3">
              <Link to="/profile" className="btn btn-success">Go to Profile</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
