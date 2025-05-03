import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [showAlcoholInput, setShowAlcoholInput] = useState(false);
  const [showSnackInput, setShowSnackInput] = useState(false);
  const [showMealInput, setShowMealInput] = useState(false);

  const formRef = useRef(null);
  const calendarRef = useRef(null);
  let history = useHistory();

  // Form alanları için state'ler
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [alcoholDetail, setAlcoholDetail] = useState("");
  const [snack, setSnack] = useState("");
  const [snackDetail, setSnackDetail] = useState("");
  const [meal, setMeal] = useState("");
  const [mealDetail, setMealDetail] = useState("");

  useEffect(() => {
    axios
      .get(`https://localhost:7072/api/WeddingHall/${slug}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Detay yüklenirken hata oluştu:", error);
        setError("Ürün detayları yüklenirken bir hata oluştu.");
      });
  }, [slug]);

  const handleAlcoholChange = (e) => {
    const value = e.target.value;
    setAlcohol(value);
    setShowAlcoholInput(value === "Evet");
  };

  const handleSnackChange = (e) => {
    const value = e.target.value;
    setSnack(value);
    setShowSnackInput(value === "Evet");
  };

  const handleMealChange = (e) => {
    const value = e.target.value;
    setMeal(value);
    setShowMealInput(value === "Evet");
  };

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      alcohol,
      alcoholDetail,
      snack,
      snackDetail,
      meal,
      mealDetail,
      weddingHallId: product.id,
    };

    try {
      await axios.post("https://localhost:7072/api/Booking", formData);
      alert("Rezervasyon başarıyla gönderildi!");
    } catch (err) {
      console.error("Rezervasyon gönderme hatası:", err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const tileDisabled = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return !availableDates.includes(formattedDate);
  };

  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!product) return <p className="text-center text-muted">Yükleniyor...</p>;

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">All Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
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

          <div className="row g-3 mb-4">
            <div className="col">
              <button onClick={handleScrollToForm} className="btn btn-outline-dark py-2 w-100">Rezervasyon Yap</button>
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

      {/* Takvim ve Form Alanı */}
      <div ref={calendarRef} className="row mt-5">
        <div className="col-lg-12">
          <div className="border rounded p-4 d-flex align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="me-4">
              <Calendar
                tileDisabled={tileDisabled}
                tileClassName={({ date }) =>
                  availableDates.includes(date.toISOString().split("T")[0]) ? "bg-success text-white" : ""
                }
              />
            </div>

            {/* Form Alanı */}
            <div className="flex-grow-1">
              <h4>Rezervasyon Bilgileri</h4>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">İsim</label>
                  <input type="text" className="form-control" placeholder="Adınızı girin"
                    value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Soyisim</label>
                  <input type="text" className="form-control" placeholder="Soyadınızı girin"
                    value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Düğünde Alkol olacak mı?</label>
                  <select className="form-select" value={alcohol} onChange={handleAlcoholChange}>
                    <option value="">Seçiniz</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                  </select>
                </div>

                {showAlcoholInput && (
                  <div className="mb-3">
                    <label className="form-label">İstediğiniz alkolleri belirtiniz.</label>
                    <input type="text" className="form-control" placeholder="Alkol Türü Giriniz"
                      value={alcoholDetail} onChange={(e) => setAlcoholDetail(e.target.value)} />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Düğünde Çerez olacak mı?</label>
                  <select className="form-select" value={snack} onChange={handleSnackChange}>
                    <option value="">Seçiniz</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                  </select>
                </div>

                {showSnackInput && (
                  <div className="mb-3">
                    <label className="form-label">İstediğiniz Çerezleri belirtiniz.</label>
                    <input type="text" className="form-control" placeholder="Çerez Türü Giriniz"
                      value={snackDetail} onChange={(e) => setSnackDetail(e.target.value)} />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Düğünde Yemek olacak mı?</label>
                  <select className="form-select" value={meal} onChange={handleMealChange}>
                    <option value="">Seçiniz</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                  </select>
                </div>

                {showMealInput && (
                  <div className="mb-3">
                    <label className="form-label">İstediğiniz Yemekleri belirtiniz.</label>
                    <input type="text" className="form-control" placeholder="İstediğiniz yemekleri giriniz"
                      value={mealDetail} onChange={(e) => setMealDetail(e.target.value)} />
                  </div>
                )}

                <button type="submit" className="btn btn-primary">Rezervasyon Yap</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
