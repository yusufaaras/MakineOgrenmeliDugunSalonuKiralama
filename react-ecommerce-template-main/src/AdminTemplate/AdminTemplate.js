import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function AdminTemplate({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`admin-content ${isSidebarOpen ? "open" : "closed"}`}>{children}</div>
      <Footer />
    </div>
  );
}

export default AdminTemplate;
