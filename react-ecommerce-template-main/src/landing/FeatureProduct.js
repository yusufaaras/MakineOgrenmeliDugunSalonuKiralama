import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FeatureProduct({ maxItems = 6 }) {
  const [weddingHalls, setWeddingHalls] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7072/api/WeddingHall")
      .then(response => {
        console.log("Gelen Düğün Salonları:", response.data);
        const uniqueHalls = Array.from(new Map(response.data.map(hall => [hall.id, hall])).values());
        setWeddingHalls(uniqueHalls.slice(0, maxItems)); 
      })
      .catch(error => console.error("Düğün salonları yüklenirken hata oluştu:", error));

  }, [maxItems]);

  return (
    <>
      <div className="container my-5">
        <div className="row g-4">
          {weddingHalls.length > 0 ? (
            weddingHalls.map(hall => (
              <div key={hall.id} className="col">
                <div className="card shadow-sm">
                  <img
                    className="card-img-top bg-dark cover"
                    height="240"
                    alt=""
                    src={hall.homeImageUrl}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{hall.name}</h5>
                    <div className="d-grid gap-2">
                      <Link
                        to={`/products/${hall.id}`}
                        className="btn btn-outline-danger text-dark fw-bold"
                        style={{ fontFamily: "cursive" }}
                        replace
                      >
                        Detay
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Henüz düğün salonu eklenmedi.</p>
          )}
        </div>
      </div> 


    </>
  );

}

export default FeatureProduct;