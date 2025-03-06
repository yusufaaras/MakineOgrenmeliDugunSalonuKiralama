import { useState, useEffect } from "react";
import axios from "axios";

const useBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7072/api/booking")
            .then((response) => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Veri çekme hatası:", error);
                setError(error);
                setLoading(false);
            });
    }, []);

    return { bookings, loading, error };
};

export default useBookings;
