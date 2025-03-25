import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
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
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const calendarRef = useRef(null);
  const history = useHistory();
  const [selectedDate,setSelectedDate] = useState(null);
  const [selectedPrice,setSelectedPrice] = useState(null);

 
  const makeReservation = async () => {
    if (!selectedDate || !selectedPrice) { // 🛠️ Buradaki hatayı düzelttik
      setMessage("Lütfen bir tarih ve hizmet seçiniz.");
      return;
    }
    const reservationData = {
      date: selectedDate, 
      price: selectedPrice, // 🛠️ "prive" yerine "price" olmalı
    };

  useEffect(() => {
    axios
      .get(`https://localhost:7072/api/WeddingHall/${slug}`)
      .then((response) => {
        setProduct(response.data);
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

  try {
    const response = await fetch("https://localhost:7072/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    if (response.ok) {
      setMessage("Rezervasyon başarıyla kaydedildi!");
    } else {
      setMessage("Rezervasyon kaydedilemedi.");
    }
  } catch (error) {
    console.error("Rezervasyon hatası:", error);
    setMessage("Bir hata oluştu.");
  }
};

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      
      <div className="row mt-5">
  <div className="col-lg-12">
    <div className="border rounded p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="row">
        {/* Sol Taraf: Takvim */}
        <div className="col-md-4">
          <Calendar onChange={setSelectedDate(selectedDate)}/>
        </div>

        {/* Sağ Taraf: Rezervasyon Formu */}
        <div className="col-md-4">
          <h4>Rezervasyon Bilgileri</h4>
          <form>
            <div className="dropdown mb-5">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {selectedService || "Hangi hizmeti istersiniz?"}
              </button>
              <ul className="dropdown-menu">
                {["80.000", "100.000", "120.000"].map((service, index) => (
                  <li key={index}>
                    <button className="dropdown-item" type="button" onClick={() => setSelectedPrice(selectedPrice)}>
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleReservation}>
              Rezervasyon Yap
            </button>
          </form>
          {message && <p className="mt-3 text-success">{message}</p>}
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
  }
 export default ProductDetail;