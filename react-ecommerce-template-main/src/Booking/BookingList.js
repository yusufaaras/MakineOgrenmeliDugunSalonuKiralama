import useBookings from "./UseBooking";

const BookingList = () => {
  const { bookings, loading, error } = useBookings();

  if (loading) return <p>Veriler yükleniyor...</p>;
  if (error) return <p>Hata: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rezervasyonlar</h2>
      <ul className="space-y-2">
        {bookings.map((booking) => (
          <li key={booking.id} className="p-2 border rounded-lg shadow">
            <p><strong>Ad:</strong> {booking.name}</p>
            <p><strong>Tarih:</strong> {new Date(booking.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
