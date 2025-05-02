import { Link } from "react-router-dom";
import Product from "./Product";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faThList, faThLarge } from "@fortawesome/free-solid-svg-icons";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

const categories = [
    "En İyiler",
    "En Yeniler",
    "En Modernler",
    "En Pahalılar",
    "En Ucuzlar",
    "En kapasiteliler",
];

const Capacity = ["1000", "500", "250", "100"];
const CapacityOptions = Capacity.map(c => ({ value: c, label: `${c} Kişilik` }));

const city = ["İstanbul", "İzmir", "Bursa", "Ankara", "Eskişehir"];
const cityOptions = city.map(c => ({ value: c, label: c }));

function FilterMenuLeft({ filters, onFilterChange }) {
    const [startDate, setStartDate] = useState(filters.startDate || "");
    const [endDate, setEndDate] = useState(filters.endDate || "");
    const [selectedCities, setSelectedCities] = useState(filters.cities || []);
    const [selectedCapacities, setSelectedCapacities] = useState(filters.capacities || []);
    const [minPrice, setMinPrice] = useState(filters.minPrice );
    const [maxPrice, setMaxPrice] = useState(filters.maxPrice );

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleCityChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedCities([...selectedCities, value]);
        } else {
            setSelectedCities(selectedCities.filter((c) => c !== value));
        }
    };

    const handleCapacityChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedCapacities([...selectedCapacities, value]);
        } else {
            setSelectedCapacities(selectedCapacities.filter((c) => c !== value));
        }
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleApplyFilters = () => {
        onFilterChange({
            startDate,
            endDate,
            cities: selectedCities,
            capacities: selectedCapacities,
            minPrice: minPrice ? parseInt(minPrice, 10) : null,
            maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
        });
    };

    return (
        <ul className="list-group list-group-flush rounded">
            <li className="list-group-item d-none d-lg-block">
                <h5 className="mt-1 mb-2">Filtrele</h5>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-1">Tarih Aralığı</h5>
                <div className="d-flex flex-column">
                    <div className="form-floating mb-2">
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                        <label htmlFor="startDate">Tarih</label>
                    </div>
                </div>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-1">Şehirler</h5>
                <div className="d-flex flex-column">
                    {cityOptions.map((option) => (
                        <div key={option.value} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={option.value}
                                checked={selectedCities.includes(option.value)}
                                onChange={handleCityChange}
                            />
                            <label className="form-check-label" htmlFor={`city-${option.value}`}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-1">Kapasite</h5>
                <div className="d-flex flex-column">
                    {CapacityOptions.map((option) => (
                        <div key={option.value} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={option.value}
                                checked={selectedCapacities.includes(option.value)}
                                onChange={handleCapacityChange}
                            />
                            <label className="form-check-label" htmlFor={`capacity-${option.value}`}>
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-2">Fiyat Aralığı</h5>
                <div className="d-grid d-block mb-3">
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Min"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                        />
                        <label htmlFor="floatingInput">Min Bütçe</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                        />
                        <label htmlFor="floatingInput">Max Bütçe</label>
                    </div>
                    <button className="btn btn-dark" onClick={handleApplyFilters}>Uygula</button>
                </div>
            </li>
        </ul>
    );
}

function ProductList() {
    const [viewType, setViewType] = useState({ grid: true });
    const [weddingHalls, setWeddingHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        cities: [],
        capacities: [],
        minPrice: null,
        maxPrice: null,
    });

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
                setError("Düğün salonları yüklenirken bir hata oluştu.");
                setLoading(false);
            });
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredHalls = weddingHalls.filter((hall) => {
        const nameOrDescriptionMatch =
            hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hall.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

        const cityMatch = filters.cities.length === 0 || filters.cities.includes(hall.city);
        const capacityMatch =
            filters.capacities.length === 0 || filters.capacities.some(cap => hall.capacity >= parseInt(cap, 10));
        const priceMatch =
            (!filters.minPrice || hall.price >= filters.minPrice) &&
            (!filters.maxPrice || hall.price <= filters.maxPrice);

        // Tarih filtrelemesi backend'e bırakılabilir, bu örnekte dahil edilmedi.

        return nameOrDescriptionMatch && cityMatch && capacityMatch && priceMatch;
    });

    function changeViewType() {
        setViewType({
            grid: !viewType.grid,
        });
    }

    if (loading) {
        return <p className="text-center">Yükleniyor...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />
            <nav aria-label="breadcrumb" className="bg-custom-light rounded">
                <ol className="breadcrumb p-3 mb-0">
                    <li className="breadcrumb-item">
                        <Link
                            className="text-decoration-none link-secondary"
                            to="/products"
                            replace
                        >
                            Salonlar
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Gözat
                    </li>
                </ol>
            </nav>

            <div className="h-scroller d-block d-lg-none">
                <nav className="nav h-underline">
                    {categories.map((v, i) => (
                        <div key={i} className="h-link me-2">
                            <Link
                                to="/products"
                                className="btn btn-sm btn-outline-dark rounded-pill"
                                replace
                            >
                                {v}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="row mb-3 d-block d-lg-none">
                <div className="col-12">
                    <div id="accordionFilter" className="accordion shadow-sm">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button fw-bold collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFilter"
                                    aria-expanded="false"
                                    aria-controls="collapseFilter"
                                >
                                    Filtrele
                                </button>
                            </h2>
                        </div>
                        <div
                            id="collapseFilter"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFilter"
                        >
                            <div className="accordion-body p-0">
                                <FilterMenuLeft filters={filters} onFilterChange={handleFilterChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4 mt-lg-3">
                <div className="d-none d-lg-block col-lg-3">
                    <div className="border rounded shadow-sm">
                        <FilterMenuLeft filters={filters} onFilterChange={handleFilterChange} />
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="d-flex flex-column h-100">
                        <div className="row mb-3">
                            <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Salon Ara"
                                        aria-label="search input"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className="btn btn-outline-dark">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                                    onClick={changeViewType}
                                >
                                    <FontAwesomeIcon
                                        icon={viewType.grid ? faThList : faThLarge}
                                    />
                                </button>
                            </div>
                        </div>
                        <div
                            className={`row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 g-3 mb-4 flex-shrink-0 ${
                                viewType.grid ? "" : "row-cols-1"
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
                        </div>

                        <div className="d-flex align-items-center mt-auto">
                            <span className="text-muted small d-none d-md-inline">
                                {filteredHalls.length} salon gösteriliyor
                            </span>
                            <nav aria-label="Page navigation example" className="ms-auto">
                                <ul className="pagination my-0">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="!#">
                                            Önceki
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="!#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item disabled">
                                        <a className="page-link" href="!#">
                                            Sonraki
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;