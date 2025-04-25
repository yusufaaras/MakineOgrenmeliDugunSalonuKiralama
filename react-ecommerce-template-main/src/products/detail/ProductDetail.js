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
  const [categoryName, setCategoryName] = useState("");
  const [locationDetails, setLocationDetails] = useState(null);
  const [error, setError] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const calendarRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const url = "https://localhost:7072/api/Logins";
        const response = await axios.post(url);
        const userData = response.data;
        if (userData?.token) {
          localStorage.setItem("token", userData.token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Token alınırken hata oluştu:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:7072/api/WeddingHall/${slug}`)
      .then((response) => {
        setProduct(response.data);
        setSelectedImage(response.data.homeImageUrl);
        return axios.get(`https://localhost:7072/api/Categories/${response.data.categoryId}`);
      })
      .then((response) => {
        setCategoryName(response.data.name);
      })
      .catch((error) => {
        console.error("Detay yüklenirken hata oluştu:", error);
        setError("Ürün detayları yüklenirken bir hata oluştu.");
      });
  }, [slug]);

  useEffect(() => {
    if (product?.locationId) {
      axios
        .get(`https://localhost:7072/api/Location/${product.locationId}`)
        .then((response) => {
          setLocationDetails(response.data);
        })
        .catch((error) => {
          console.error("Konum bilgisi alınırken hata oluştu:", error);
        });
    }
  }, [product?.locationId]);

  useEffect(() => {
    if (product?.id) {
      axios
        .get(`https://localhost:7072/api/WeddingHall/availableDates/${product.id}`)
        .then((response) => {
          setAvailableDates(response.data);
        })
        .catch((error) => {
          console.error("Müsait tarihler alınırken hata oluştu:", error);
        });
    }
  }, [product?.id]);

  const handleReservation = async () => {
    if (!isAuthenticated) {
      history.push("/AuthPage");
    } else {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          "https://localhost:7072/api/Booking",
          {
            productId: product?.id,
            service: selectedService,
            date: selectedDate?.toISOString().split("T")[0],
            guestCount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setMessage("Rezervasyon başarıyla oluşturuldu!");
      } catch (error) {
        console.error("Rezervasyon yapılırken hata oluştu:", error);
        setMessage("Rezervasyon oluşturulamadı. Lütfen tekrar deneyin.");
      }
    }
  };

  const handleClick = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tileDisabled = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return !availableDates.includes(formattedDate);
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
          <img className="border rounded w-100" alt={product.name} src={selectedImage} />
          <div className="d-flex justify-content-start mt-3">
            {[product.homeImageUrl, product.detailImageUrl1, product.detailImageUrl2, product.detailImageUrl3, product.detailImageUrl4].map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Detail Image ${index + 1}`}
                  className="border rounded me-2"
                  style={{ width: "80px", height: "80px", cursor: "pointer", objectFit: "cover" }}
                  onClick={() => setSelectedImage(image)}
                />
              )
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <h2 className="mb-1">{product.name}</h2>
          <p className="text-muted">{product.shortDescription}</p>
          <p><strong>Kapasite:</strong> {product.capacity} kişi</p>
          <p><strong>Kategori:</strong> {categoryName || "Bilinmiyor"}</p>
          <p><strong>Konum:</strong> {locationDetails ? `${locationDetails.address}, ${locationDetails.city}, ${locationDetails.country}` : "Bilgi alınamadı"}</p>

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
          <p className="lead">{product.longDescription}</p>
        </div>
      </div>

      <div ref={calendarRef} className="row mt-5">
        <div className="col-lg-12">
          <div className="border rounded p-4" style={{ backgroundColor: "#f8f9fa" }}>
            <Calendar
              //tileDisabled={tileDisabled}
              onClickDay={(date) => setSelectedDate(date)}
              value={selectedDate}
            />

            <h4 className="mt-4">Rezervasyon Bilgileri</h4>
            <div className="form-group">
              <label htmlFor="selectedDate">Tarih</label>
              <input
                type="text"
                id="selectedDate"
                className="form-control"
                value={selectedDate ? selectedDate.toLocaleDateString("tr-TR") : ""}
                readOnly
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="guestCount">Kişi Sayısı</label>
              <input
                type="number"
                id="guestCount"
                className="form-control"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                min="1"
              />
            </div>

            <div className="dropdown mt-3">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {selectedService || "Hangi hizmeti istersiniz?"}
              </button>
              <ul className="dropdown-menu">
                {["80.000", "100.000", "120.000"].map((service, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href="#" onClick={() => setSelectedService(service)}>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <button type="button" className="btn btn-primary mt-3" onClick={handleReservation}>
              Rezervasyon Yap {selectedService && <span className="badge bg-light text-dark ms-2">{selectedService}</span>}
            </button>
            {message && <p className="mt-3 text-success">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
