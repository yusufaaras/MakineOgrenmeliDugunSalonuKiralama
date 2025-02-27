import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Product() {
  const [weddingHalls, setWeddingHalls] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7072/api/WeddingHall")
      .then((res) => res.json())
      .then((data) => setWeddingHalls(data))
      .catch((err) => console.error("Hata:", err));

    fetch("https://localhost:7072/api/Categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Hata:", err));
  }, []);

  // Kategori ID'sine göre isim bulma fonksiyonu
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.categoryId === categoryId);
    return category ? category.name : "Bilinmiyor";
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        {weddingHalls.length > 0 ? (
          weddingHalls.map((hall) => (
            <div className="card-body" key={hall.id}>
              <div className="card shadow-sm h-100"> 
                <Link to={`/products/${hall.id}`} replace>
                  <img
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt={hall.name}
                    src={hall.homeImageUrl || "default-image.jpg"} 
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center text-dark text-truncate">
                    {hall.name}
                  </h5>
                  <p className="card-text text-center text-muted">
                    Kapasite: {hall.capacity}
                  </p>
                  <p className="card-text text-center text-muted">
                    Kategori: {getCategoryName(hall.categoryId)}
                  </p>
                  <p className="card-text text-center text-muted">
                    Açıklama: {hall.shortDescription}
                  </p>
                  <div className="d-grid gap-2">
                    <Link to={`/products/${hall.id}`} className="btn btn-outline-dark" replace>
                      Detay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Yükleniyor...</p>
        )}
      </div>
    </div>
  );
}

export default Product;
