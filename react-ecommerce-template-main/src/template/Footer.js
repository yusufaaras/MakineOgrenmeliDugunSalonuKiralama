

function Footer() {
  return (
    <footer className="mt-auto py-5 bg-danger text-white">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Sol - Keşfet */}
          <div className="col-md-4 mb-3">
            <h5>Keşfet</h5><br/>
            <ul className="list-unstyled">
              <li><a href="#gallery" className="text-white text-decoration-none">Galeri</a></li> 
              <li><a href="#offers" className="text-white text-decoration-none">Kampanyalar</a></li>
              <li><a href="#blog" className="text-white text-decoration-none">Blog</a></li>
            </ul>
          </div>
  
          {/* Orta - Copyright */}
          <div className="col-md-4 mb-3 d-flex align-items-center justify-content-center">
            <span>Salon &copy; Website 2025</span>
          </div>
  
          {/* Sağ - Yönlendirme */}
          <div className="col-md-4 mb-3 text-md-end">
            <h5>Hızlı Erişim</h5><br/>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-white text-decoration-none">Anasayfa</a></li>
              <li><a href="#services" className="text-white text-decoration-none">Hizmetler</a></li>
              <li><a href="#about" className="text-white text-decoration-none">Hakkımızda</a></li>
              <li><a href="#contact" className="text-white text-decoration-none">İletişim</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
  
}

export default Footer;
