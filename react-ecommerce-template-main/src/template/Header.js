import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Kullanıcı rolünü saklamak için state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole"); // localStorage'dan rolü al

    setIsAuthenticated(!!token); // Token varsa true, yoksa false
    setUserRole(storedRole); // Rolü state'e aktar
  }, []);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav() {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand text-danger" to="/" onClick={changeNav}>
            <FontAwesomeIcon icon={["fab", "bootstrap"]} className="ms-1" size="lg" />
            <span className="ms-2 h5">Salon</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? "open" : "")}>
            <ul className="navbar-nav me-auto mb-lg-0 d-flex gap-3 align-items-center">
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link text-dark fs-5 fst-italic px-3 py-1 rounded border border-danger bg-light shadow-sm"
                  style={{ fontFamily: "cursive" }}
                  replace
                  onClick={changeNav}
                >
                  Keşfet
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="http://127.0.0.1:5000/"
                  className="nav-link text-dark fs-5 fst-italic px-3 py-1 rounded border border-danger bg-light shadow-sm"
                  style={{ fontFamily: "cursive" }}
                >
                  Makine Öğrenmesi ile Hesapla
                </a>
              </li>
            </ul>

            {isAuthenticated ? (
              userRole === "1" ? (
                <Link
                  to="/admin/dashboard" 
                  className="btn btn-danger btn-sm me-2 fs-4"
                  style={{ fontFamily: "cursive" }}
                  replace
                  onClick={changeNav}
                >
                  <i className="fa fa-user"></i> Admin
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="btn btn-danger btn-sm me-2 fs-4"
                  style={{ fontFamily: "cursive" }}
                  replace
                  onClick={changeNav}
                >
                  <i className="fa fa-user"></i> Profilim
                </Link>
              )
            ) : (
              <Link
                to="/login"
                className="btn btn-outline-danger btn-sm me-2 fs-4"
                style={{ fontFamily: "cursive" }}
                onClick={changeNav}
              >
                <i className="fa fa-user"></i> Giriş Yap
              </Link>
            )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={openedDrawer ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleDrawer}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
