import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Token varsa true, yoksa false
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
                  className="nav-link text-dark fw-bold fs-5 fst-italic px-3 py-1 rounded border border-danger bg-light shadow-sm"
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
                  className="nav-link text-dark fw-bold fs-5 fst-italic px-3 py-1 rounded border border-danger bg-light shadow-sm"
                  style={{ fontFamily: "cursive" }}
                >
                  Makine Öğrenmesi ile Hesapla
                </a>
              </li>
            </ul>



            {isAuthenticated ? (
              <Link
                to="/profile"
                className="btn btn-danger btn-sm me-2 fs-4"
                style={{ fontFamily: "cursive" }}
                replace
                onClick={changeNav}
              >
                <i className="fa fa-user"></i> Profilim
              </Link>
            ) : (
              <Link
                to="/AuthPage"
                className="btn btn-primary btn-sm me-2 fs-4"
                style={{ fontFamily: "cursive" }}
              >
                <i className="fa fa-user"></i> Giriş Yap
              </Link>
            )}

          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
