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
  const [showSnackInput, setShowSnackInput] = useState(false);
  const [showMealInput, setShowMealInput] = useState(false);
  const calendarRef = useRef(null);
  let history = useHistory();

  // Yeni state'ler
  const [isim, setIsim] = useState('');
  const [soyisim, setSoyisim] = useState('');
  const [alkolDurumu, setAlkolDurumu] = useState('');
  const [alkolDetay, setAlkolDetay] = useState('');
  const [cerezDurumu, setCerezDurumu] = useState('');
  const [cerezDetay, setCerezDetay] = useState('');
  const [yemekDurumu, setYemekDurumu] = useState('');
  const [yemekDetay, setYemekDetay] = useState('');
  const [secilenTarih, setSecilenTarih] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hataMesaji, setHataMesaji] = useState('');
  const [basariMesaji, setBasariMesaji] = useState('');

  useEffect(() => {
    // Müsait tarihleri getirme (Örnek endpoint, backend'inize göre düzenleyin)
    axios
      .get(`https://localhost:7072/api/WeddingHall/${slug}`)
      .then((response) => {
        setAvailableDates(response.data);
      })
      .catch((error) => {
        console.error("Müsait tarihler yüklenirken hata oluştu:", error);
        // Hata yönetimi yapabilirsiniz
      });

    // Ürün detaylarını getirme
    axios
      .get(`https://localhost:7072/api/WeddingHall/
        `)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Detay yüklenirken hata oluştu:", error);
        setError("Ürün detayları yüklenirken bir hata oluştu.");
      });
  }, [slug]);

  const handleAlcoholChange = (e) => {
    setShowAlcoholInput(e.target.value === "Evet");
    setAlkolDurumu(e.target.value); // State'i de güncelle
  };

  const handleSnackChange = (e) => {
    setShowSnackInput(e.target.value === "Evet");
    setCerezDurumu(e.target.value); // State'i de güncelle
  };

  const handleMealChange = (e) => {
    setShowMealInput(e.target.value === "Evet");
    setYemekDurumu(e.target.value); // State'i de güncelle
  };

  const handleClick = () => {
    history.push("Product.js");
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tileDisabled = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return !availableDates.includes(formattedDate);
  };

  const handleDateChange = (date) => {
    setSecilenTarih(date);
    console.log('Seçilen Tarih:', date); // Kontrol için
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setYukleniyor(true);
    setHataMesaji('');
    setBasariMesaji('');

    if (!secilenTarih) {
      setHataMesaji('Lütfen bir rezervasyon tarihi seçiniz.');
      setYukleniyor(false);
      return;
    }

    const rezervasyonBilgileri = {
      weddingHallSlug: slug,
      rezervasyonTarihi: secilenTarih.toISOString().split('T')[0],
      isim: isim,
      soyisim: soyisim,
      alkolIsterMi: alkolDurumu === 'Evet',
      alkolDetay: showAlcoholInput ? alkolDetay : null,
      cerezIsterMi: cerezDurumu === 'Evet',
      cerezDetay: showSnackInput ? cerezDetay : null,
      yemekIsterMi: yemekDurumu === 'Evet',
      yemekDetay: showMealInput ? yemekDetay : null,
      // İhtiyaç duyabileceğiniz diğer alanları buraya ekleyebilirsiniz.
    };

    try {
      const response = await axios.post('https://localhost:7072/api/Booking', rezervasyonBilgileri);
      console.log('Rezervasyon Başarılı:', response.data);
      setBasariMesaji('Rezervasyonunuz başarıyla alınmıştır!');
      // Formu temizle
      setIsim('');
      setSoyisim('');
      setAlkolDurumu('');
      setAlkolDetay('');
      setCerezDurumu('');
      setCerezDetay('');
      setYemekDurumu('');
      setYemekDetay('');
      setSecilenTarih(null);
    } catch (error) {
      console.error('Rezervasyon Hatası:', error);
      setHataMesaji('Rezervasyon işlemi sırasında bir hata oluştu.');
      if (error.response && error.response.data) {
        console.error('Hata Detayları:', error.response.data);
        // Sunucudan gelen detaylı hata mesajlarını da gösterebilirsiniz.
        // setHataMesaji(error.response.data.message || 'Rezervasyon işlemi sırasında bir hata oluştu.');
      }
    } finally {
      setYukleniyor(false);
    }
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
          <div className="border rounded p-4 d-flex align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
            {/* Takvim */}
            <div className="me-4">
              <Calendar
                tileDisabled={tileDisabled}
                tileClassName={({ date }) =>
                  availableDates.includes(date.toISOString().split("T")[0]) ? "bg-success text-white" : ""
                }
                onChange={handleDateChange} // Tarih seçimini yönetmek için
              />
            </div>
            {/* Form Alanı */}
            <div className="flex-grow-1">
              <h4>Rezervasyon Bilgileri</h4>
              <form onSubmit={handleSubmit}>
                {hataMesaji && <div className="alert alert-danger">{hataMesaji}</div>}
                {basariMesaji && <div className="alert alert-success">{basariMesaji}</div>}
                <div className="mb-3">
                  <label className="form-label">İsim</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adınızı girin"
                    value={isim}
                    onChange={(e) => setIsim(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Soyisim</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Soyadınızı girin"
                    value={soyisim}
                    onChange={(e) => setSoyisim(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Düğünde Alkol olacak mı?</label>
                  <select className="form-select" onChange={handleAlcoholChange} value={alkolDurumu}>
                    <option value="">Seçiniz</option>
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
                      value={alkolDetay}
                      onChange={(e) => setAlkolDetay(e.target.value)}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Düğünde Çerez olacak mı?</label>
                  <select className="form-select" onChange={handleSnackChange} value={cerezDurumu}>
                    <option value="">Seçiniz</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                  </select>
                </div>
                {showSnackInput && (
                  <div className="mb-3">
                    <label className="form-label">İstediğiniz Çerezleri belirtiniz.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Çerez Türü Giriniz"
                      value={cerezDetay}
                      onChange={(e) => setCerezDetay(e.target.value)}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Düğünde Yemek olacak mı?</label>
                  <select className="form-select" onChange={handleMealChange} value={yemekDurumu}>
                    <option value="">Seçiniz</option>
                    <option value="Evet">Evet</option>
                    <option value="Hayır">Hayır</option>
                  </select>
                </div>
                {showMealInput && (
                  <div className="mb-3">
                    <label className="form-label">İstediğiniz Yemekleri belirtiniz.</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="İstediğiniz yemekleri giriniz"
                      value={yemekDetay}
                      onChange={(e) => setYemekDetay(e.target.value)}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Rezervasyon Tarihi</label>
                  {secilenTarih ? (
                    <input
                      type="text"
                      className="form-control"
                      value={secilenTarih.toLocaleDateString()}
                      readOnly
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Lütfen takvimden bir tarih seçin"
                      readOnly
                    />
                  )}
                </div>
                <button type="submit" className="btn btn-primary" disabled={yukleniyor}>
                  {yukleniyor ? 'Gönderiliyor...' : 'Rezervasyon Yap'}
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