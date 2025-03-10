import React from "react";
import { useHistory } from "react-router-dom";

const BookingButton = () => {
  const history = useHistory(); // React Router 5 yönlendirme için

  const goToBookingForm = () => {
    history.push("/booking-form");
  };

  return (
    <button onClick={goToBookingForm} style={styles.button}>
      Go to Booking Form
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default BookingButton;
