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
  const [availableDates, setAvailableDates] = useState([]); // Müsait tarihler
  const [showAlcoholInput, setShowAlcoholInput] = useState(false);
  const [showCookieInput, setShowCookieInput] = useState(false);
  const [showFoodInput, setShowFoodInput] = useState(false);
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [alcoholPreference, setAlcoholPreference] = useState("");
  const [cookiePreference, setCookiePreference] = useState("");
  const [foodPreference, setFoodPreference] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://localhost:7072/api/WeddingHall/${slug}`)
      .then((response) => {
        setProduct(response.data);
        // Simülasyon: Gerçek API'den müsait tarihleri almanız gerekecek.
        // Örneğin: response.data.availableBookingDates gibi bir alan olabilir.
        setAvailableDates(["2025-05-10", "2025-05-15", "2025-05-20"]);
      })
      .catch((error) => {
        console.error("Detay yüklenirken hata oluştu:", error);
        setError("Ürün detayları yüklenirken bir hata oluştu.");
      });
  }, [slug]);

  const handleAlcoholChange = (e) => {
    setShowAlcoholInput(e.target.value === "Evet");
    setAlcoholPreference(e.target.value === "Evet" ? "" : "Yok");
  };

  const handleCookieChange = (e) => {
    setShowCookieInput(e.target.value === "Evet");
    setCookiePreference(e.target.value === "Evet" ? "" : "Yok");
  };

  const handleFoodChange = (e) => {
    setShowFoodInput(e.target.value === "Evet");
    setFoodPreference(e.target.value === "Evet" ? "" : "Yok");
  };

  const handleClick = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tileDisabled = ({ date }) => {
    const formattedDate = formatDate(date);
    return !availableDates.includes(formattedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedDate) {
      alert("Lütfen bir rezervasyon tarihi seçiniz.");
      return;
    }
  
    const bookingData = {
      weddingHallId: parseInt(slug), // slug'ı integer'a çeviriyoruz
      userId: 1, // Şu an statik, gerçek uygulamada kullanıcı bilgisini almalısınız
      alcohol: alcoholPreference,
      cookie: cookiePreference,
      name: name,
      surName: surName,
      food: foodPreference,
      price: product ? product.price : "Belirlenecek", // Düğün salonu fiyat bilgisi
      capacity: product ? product.capacity : 0, // Düğün salonu kapasite bilgisi
      bookingDate: new Date(selectedDate).toISOString(),
    };
  
    // Gönderilen veriyi console'a yazdır
    console.log("Gönderilen Rezervasyon Verisi:", bookingData);
  
    axios
      .post("https://localhost:7072/api/Booking", bookingData, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Rezervasyon başarılı:", response.data);
        alert("Rezervasyonunuz başarıyla alınmıştır!");
        history.push("/reservation-success");
      })
      .catch((error) => {
        console.error("Rezervasyon sırasında hata oluştu:", error);
        alert("Rezervasyon Yapılmış bir günü Seçtiniz veye Bir hata Oluştu Tekrar Deneyiniz");
      });
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
              Tüm Ürünler
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

      {/* Takvim ve Form Alanı */}
      <div ref={calendarRef} className="row mt-5">
        <div className="col-lg-12">
          <div className="border rounded p-4 d-flex align-items-start" style={{ backgroundColor: "#f8f9fa" }}>
            {/* Takvim */}
            <div className="me-4">
              <h4>Rezervasyon Tarihi Seçin</h4>
              <Calendar
                ref={calendarRef}
                tileDisabled={tileDisabled}
                value={selectedDate}
                onChange={handleDateChange}
                tileClassName={({ date }) =>
                  availableDates.includes(formatDate(date)) ? "bg-success text-white" : ""
                }
              />
              {selectedDate && (
                <p className="mt-2">Seçilen Tarih: {formatDate(selectedDate)}</p>
              )}
              {!selectedDate && (
                <p className="mt-2 text-muted">Lütfen bir tarih seçin.</p>
              )}
            </div>

            {/* Form Alanı */}
            <div className="flex-grow-1">
              <h4>Rezervasyon Bilgileri</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">İsim</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adınızı girin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Soyisim</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Soyadınızı girin"
                    value={surName}
                    onChange={(e) => setSurName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Düğünde Alkol olacak mı?</label>
                  <select className="form-select" onChange={handleAlcoholChange} defaultValue="">
                    <option value="" disabled>Seçiniz</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                  </select>
                </div>
                {showAlcoholInput && (
                  <div className="mb-3">
                    <label className="form-label">İstediğiniz alkolleri belirtiniz.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Alkol Türü Giriniz"
                      value={alcoholPreference}
                      onChange={(e) => setAlcoholPreference(e.target.value)}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Düğünde Çerez olacak mı?</label>
                  <select className="form-select" onChange={handleCookieChange} defaultValue="">
                    <option value="" disabled>Seçiniz</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                  </select>
                </div>
                {showCookieInput && (
                  <div className="mb-3">
                    <label className="form-label">İstediğiniz Çerezleri belirtiniz.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Çerez Türü Giriniz"
                      value={cookiePreference}
                      onChange={(e) => setCookiePreference(e.target.value)}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Düğünde Yemek olacak mı?</label>
                  <select className="form-select" onChange={handleFoodChange} defaultValue="">
                    <option value="" disabled>Seçiniz</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                  </select>
                </div>
                {showFoodInput && (
                  <div className="mb-3">
                    <label className="form-label">İstediğiniz Yemekleri belirtiniz.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="İstediğiniz yemekleri giriniz"
                      value={foodPreference}
                      onChange={(e) => setFoodPreference(e.target.value)}
                    />
                  </div>
                )}
                <button type="submit" className="btn btn-primary" disabled={!selectedDate}>
                  Rezervasyon Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;