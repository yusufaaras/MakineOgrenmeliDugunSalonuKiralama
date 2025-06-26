import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product"; // Eğer Product bileşenin ayrı dosyada ise

function ProductListByGuess() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const fiyatParam = params.get("fiyat");
    const tahminiFiyat = fiyatParam ? parseInt(fiyatParam, 10) : null;
    const tolerans = 5000;

    const [weddingHalls, setWeddingHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewType] = useState({ grid: true }); 

    useEffect(() => {
        setLoading(true);
        fetch("https://localhost:7072/api/WeddingHall")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setWeddingHalls(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Düğün salonları yüklenirken hata:", err);
                setLoading(false);
            });
    }, []);

    // Sadece fiyat yakınlığına göre filtrele
    const filteredHalls = weddingHalls.filter((hall) =>
        tahminiFiyat
            ? Math.abs(hall.price - tahminiFiyat) <= tolerans
            : true
    );

    return (
        <div
            className={`row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-3 mb-4 flex-shrink-0 ${viewType.grid ? "" : "row-cols-1"
                }`}
        >
            {filteredHalls.map((hall) => (
                <div className="col" key={hall.id}>
                    <Product hall={hall} isGrid={viewType.grid} />
                </div>
            ))}
            {filteredHalls.length === 0 && !loading && (
                <div className="col-12 text-center">
                    <p>Aradığınız kriterlere uygun salon bulunamadı.</p>
                </div>
            )}
            {loading && (
                <div className="col-12 text-center">
                    <p>Yükleniyor...</p>
                </div>
            )}
        </div>
    )
}
export default ProductListByGuess;