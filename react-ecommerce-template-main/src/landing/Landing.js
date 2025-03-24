import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Landing.css"; // CSS dosyası

function Landing() {
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          Düğün salonları bir tık uzağınızda. Hemen alttaki butona tıklayın ve seçiminizi yapın.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-danger" replace>
            Düğün Salonlarını Keşfet
          </Link>
        </div>
      </div>

      <h2 className="text-muted text-center mt-4 mb-3">En Çok Ziyaret Edilenler</h2>
      <div className="container pb-5 px-lg-5">
        <div className="feature-products-container row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <FeatureProduct maxItems={6} />
        </div>
      </div>

      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Bizleri Sosyal Medyadan Takip Edin</h5>
        <div className="d-flex justify-content-center social-icons">
          <a href="!#" className="social-link">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#" className="social-link">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="social-link">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
