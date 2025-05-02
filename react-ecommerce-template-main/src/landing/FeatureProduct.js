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

      <div className="w3-container w3-padding-64 w3-theme-l5" id="contact">
  <div className="w3-row">
    <div className="w3-col m5">
      <div className="w3-padding-16">
        <span className="w3-xlarge w3-border-teal w3-bottombar">Contact Us</span>
      </div>
      <h3>Address</h3>
      <p>Swing by for a cup of coffee, or whatever.</p>
      <p><i className="fa fa-map-marker w3-text-teal w3-xlarge"></i> Chicago, US</p>
      <p><i className="fa fa-phone w3-text-teal w3-xlarge"></i> +00 1515151515</p>
      <p><i className="fa fa-envelope-o w3-text-teal w3-xlarge"></i> test@test.com</p>
    </div>

    <div className="w3-col m7">
      <form className="w3-card-4 w3-white w3-padding-32 w3-round-large custom-form" action="/action_page.php" target="_blank">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className="form-control" type="text" name="Name" required />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" name="Email" required />
        </div>
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea className="form-control" name="Message" rows="4" required></textarea>
        </div>
        <div className="form-check text-end">
          <input className="form-check-input" type="checkbox" defaultChecked name="Like" />
          <label className="form-check-label ms-2">I Like it!</label>
        </div>
        <div className="text-end mt-3">
          <button type="submit" className="btn btn-primary px-4">Send</button>
        </div>
      </form>
    </div>
  </div>
</div>


    </>
  );

}

export default FeatureProduct;