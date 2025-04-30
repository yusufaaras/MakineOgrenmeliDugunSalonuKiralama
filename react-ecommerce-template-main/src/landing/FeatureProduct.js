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
        setWeddingHalls(uniqueHalls.slice(0, maxItems)); // Maksimum 6 veri al
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
      <div className="container my-3" id="about">
        <h3 className="border-bottom border-secondary pb-3">About</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
  
      {/* Team Section */}
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-md-4 g-4 text-center">
          {[
            { name: "John Doe", title: "CEO & Founder", image: "https://images.pexels.com/photos/1545348/pexels-photo-1545348.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { name: "Jane Doe", title: "Architect", image: "https://images.pexels.com/photos/1545348/pexels-photo-1545348.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { name: "Mike Ross", title: "Architect", image: "https://images.pexels.com/photos/1545348/pexels-photo-1545348.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { name: "Dan Star", title: "Architect", image: "https://images.pexels.com/photos/1545348/pexels-photo-1545348.jpeg?auto=compress&cs=tinysrgb&w=600" },
          ].map((member, idx) => (
            <div className="col" key={idx}>
              <div className="card h-100 shadow-sm">
                <img src={member.image} className="card-img-top" alt={member.name} />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="text-muted">{member.title}</p>
                  <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <button className="btn btn-outline-secondary w-100">Contact</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
  
}

export default FeatureProduct;