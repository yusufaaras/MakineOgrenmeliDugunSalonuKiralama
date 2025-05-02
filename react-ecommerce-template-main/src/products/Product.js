import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Eğer kullanmıyorsanız kaldırın

function Product({ hall }) { // hall prop'unu alacak şekilde
    return (
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
                    Açıklama: {hall.shortDescription}
                </p>
                <p className="card-text text-center text-muted">
                    Konum: {hall.city}
                </p>
                <p className="card-text text-center text-muted">
                    Kapasite: {hall.capacity}
                </p>
                <p className="card-text text-center text-muted">
                    Fiyat: {hall.price} TL
                </p>
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
    );
}

export default Product;