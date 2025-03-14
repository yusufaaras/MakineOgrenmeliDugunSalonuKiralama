import { useNavigate } from "react-router-dom";

export default function BookingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/booking-register")}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Rezervasyon oluştur
    </button>
  );
}