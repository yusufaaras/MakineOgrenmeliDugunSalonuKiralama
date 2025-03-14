import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";




function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState(""); // Kategori adını saklamak için state
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    axios
      .get(`https://localhost:7072/api/WeddingHall/${slug}`)
      .then((response) => {
        setProduct(response.data);

        // Eğer ürün bilgisi geldiyse, kategori ID'yi kullanarak kategori adını getir
        return axios.get(`https://localhost:7072/api/Categories/${response.data.categoryId}`);
      })
      .then((response) => {
        setCategoryName(response.data.name); // Gelen kategori adını kaydet
      })
      .catch((error) => {
        console.error("Detay yüklenirken hata oluştu:", error);
        setError("Ürün detayları yüklenirken bir hata oluştu.");
      });
  }, [slug]);
  let history = useHistory();

  const handleClick = () => {
    setShowCalendar(!showCalendar);

  };

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-muted">Yükleniyor...</p>;
  }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              All Products
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img className="border rounded w-100" alt={product.name} src={product.homeImageUrl} />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12">
              <div className="d-flex flex-nowrap overflow-auto">
                {[product.detailImageUrl1, product.detailImageUrl2, product.detailImageUrl3, product.detailImageUrl4].map(
                  (image, index) =>
                    image && (
                      <img key={index} className="cover rounded mb-2 me-2" width="70" height="70" alt={product.name} src={image} />
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <h2 className="mb-1">{product.name}</h2>
          <p className="text-muted">{product.shortDescription}</p>
          <p><strong>Kapasite:</strong> {product.capacity} kişi</p>
          <p><strong>Kategori:</strong> {categoryName || "Bilinmiyor"}</p> {/* Kategori ID yerine ismini yazdır */}
          <p><strong>Konum ID:</strong> {product.locationId}</p>

          <div className="row g-3 mb-4">
            <div className="col">
              <button onClick={handleClick} className="btn btn-outline-dark py-2 w-100">Rezervasyon Yap</button>
            </div>
            <div className="col">
              <button className="btn btn-dark py-2 w-100">Satın Al</button>
            </div>
          </div>

          <h4 className="mb-0">Açıklama</h4>
          <hr />
          <p className="lead flex-shrink-0">{product.longDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
