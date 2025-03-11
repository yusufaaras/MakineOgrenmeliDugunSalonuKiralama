import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Modal'ın dışına tıklayınca hata almamak için

function BookingButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      {/* Buton */}
      <button onClick={() => setModalIsOpen(true)} className="btn btn-primary">
        Rezervasyon Yap
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: "400px",
            height: "350px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          },
        }}
      >
        <h2>Rezervasyon Formu</h2>

        {/* Form */}
        <form>
          <div className="form-group">
            <label>Katılımcı Sayısı:</label>
            <input type="number" className="form-control" />
          </div>

          <div className="form-group">
            <label>Toplam Ücret:</label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group">
            <label>Durum:</label>
            <select className="form-control">
              <option>Beklemede</option>
              <option>Onaylandı</option>
              <option>İptal Edildi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Rezervasyon Tarihi:</label>
            <input type="date" className="form-control" />
          </div>

          {/* Kaydet ve Kapat Butonları */}
          <div className="mt-3">
            <button type="submit" className="btn btn-success">
              Kaydet
            </button>
            <button onClick={() => setModalIsOpen(false)} className="btn btn-danger ml-2">
              Kapat
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default BookingButton;