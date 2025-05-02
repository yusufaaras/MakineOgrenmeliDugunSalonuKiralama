import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState, useEffect } from "react"; // useEffect'i ekledik
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

const categories = [
  "En İyiler",
  "En Yeniler",
  "En Modernler",
  "En Pahalılar",
  "En Ucuzlar",
  "En kapasiteliler",
];

const Capacity = ["1000", "500", "250", "100"];

const city = ["İstanbul", "İzmir", "Bursa", "Ankara", "Eskişehir"];

function FilterMenuLeft() {
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Göz At</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((v, i) => (
            <Link
              key={i} // key prop'u burada
              to="/products"
              className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
              replace
            >
              {v}
            </Link>
          ))}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Şehirler</h5>
        <div className="d-flex flex-column">
          {city.map((v, i) => (
            <div key={i} className="form-check"> {/* key prop'u burada */}
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {v}
              </label>
            </div>
          ))}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Kapasite</h5>
        <div className="d-flex flex-column">
          {Capacity.map((v, i) => (
            <div key={i} className="form-check"> {/* key prop'u burada */}
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {v}
              </label>
            </div>
          ))}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Fiyat Aralığı</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue="100000"
            />
            <label htmlFor="floatingInput">Min Bütçe</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue="500000"
            />
            <label htmlFor="floatingInput">Max Bütçe</label>
          </div>
          <button className="btn btn-dark">Uygula</button>
        </div>
      </li>
    </ul>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  // Düğün salonları verisini tutacak state
  const [weddingHalls, setWeddingHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7072/api/WeddingHall")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setWeddingHalls(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Düğün salonları yüklenirken hata:", err);
        setError("Düğün salonları yüklenirken bir hata oluştu.");
        setLoading(false);
      });
  }, []);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  if (loading) {
    return <p className="text-center">Yükleniyor...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
              replace
            >
              Salonlar
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Gözat
          </li>
        </ol>
      </nav>

      <div className="h-scroller d-block d-lg-none">
        <nav className="nav h-underline">
          {categories.map((v, i) => (
            <div key={i} className="h-link me-2"> {/* key prop'u burada */}
              <Link
                to="/products"
                className="btn btn-sm btn-outline-dark rounded-pill"
                replace
              >
                {v}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      <div className="row mb-3 d-block d-lg-none">
        <div className="col-12">
          <div id="accordionFilter" className="accordion shadow-sm">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Filter Products
                </button>
              </h2>
            </div>
            <div
              id="collapseFilter"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFilter"
            >
              <div className="accordion-body p-0">
                <FilterMenuLeft />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-3 d-none d-lg-block">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue=""
                >
                  <option value="">Tüm Seçenekler</option>
                  <option value="1">Ucuz</option>
                  <option value="2">Orta</option>
                  <option value="3">Pahalı</option>
                </select>
              </div>
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Salon Ara"
                    aria-label="search input"
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-3 mb-4 flex-shrink-0"
              }
            >
              {weddingHalls.map((hall) => (
                <div className="col" key={hall.id}> {/* key prop'u burada */}
                  <Product hall={hall} />
                </div>
              ))}
            </div>

            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted small d-none d-md-inline">

              </span>
              <nav aria-label="Page navigation example" className="ms-auto">
                <ul className="pagination my-0">
                  <li className="page-item">
                    <a className="page-link" href="!#">
                      Önceki
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="!#">
                      1
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="!#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="!#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="!#">
                      Sonraki
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;