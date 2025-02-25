import Image from "../landing/foto-2.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductH(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}TL`;

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", left: "0.5rem" }}
      >
        {props.percentOff}% İndirim
      </div>
    );

    offPrice = (
      <>
        <del>{price}TL</del> {price - (props.percentOff * price) / 100}TL
      </>
    );
  }
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-4">
            <Link to="/products/1" href="!#" replace>
              {percentOff}
              <img
                className="rounded-start bg-dark cover w-100 h-100"
                alt=""
                src={Image}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  Düğün Salonu İsmi
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {offPrice}
                </span>
                <div className="mt-auto d-flex">
                  <button className="btn btn-outline-dark ms-auto">
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Detay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
