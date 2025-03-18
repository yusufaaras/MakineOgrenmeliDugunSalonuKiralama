import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTachometerAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

function Header({ isOpen, setIsOpen }) {
  const history = useHistory();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul className="sidebar-menu">
          <li>
            <button className="btn btn-link text-white" onClick={() => history.push("/admin/dashboard")}>
              <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
              <span className={isOpen ? "" : "d-none"}>Dashboard</span>
            </button>
          </li>
          <li>
            <Link to="/admin" className="btn btn-link text-white">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              <span className={isOpen ? "" : "d-none"}>Salon Ekle</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
