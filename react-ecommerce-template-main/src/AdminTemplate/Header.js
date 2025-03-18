import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt, faTachometerAlt, faHome } from "@fortawesome/free-solid-svg-icons";
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
            <Link to="/admin/Hall" className="btn btn-link text-white">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              <span className={isOpen ? "" : "d-none"}>Salonlar</span>
            </Link>
          </li>
          
          <li>
            <Link to="/admin/Reservation" className="btn btn-link text-white">
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              <span className={isOpen ? "" : "d-none"}>Rezervasyonlar</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
