import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"; // Bunu ekle!
import { Link } from "react-router-dom";
import { useState } from "react";
import {useHistory} from "react-router-dom"


function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const history = useHistory();

  const showDashboard = () => {
    history.push('/dashboard');
  };

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Admin Salon</span>
            
          </Link>
          <button className="nav-link" onClick={showDashboard}>
                  Dashboard
                </button>
                <Link to="/users" className="nav-link" replace onClick={changeNav}>
                  Keşfet
                </Link>
          
        </div>
      </nav>
    </header>
  );
}

export default Header;
