import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom"; // Link bileşenini ekledik
import "bootstrap/dist/css/bootstrap.min.css";

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
      
      // Başarılı giriş/kayıt sonrası yönlendirme
      alert(`Success: ${response.data.message || "Operation Successful"}`);
      history.push("/profile");
      
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
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

            {/* Profile sayfasına geçiş için alternatif buton */}
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
