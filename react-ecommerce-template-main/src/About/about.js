import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-page-container">
            <div className="hero-section">
                <br />
                <br />
                <h1 className="hero-title">Hakkımızda</h1>
                <p className="hero-subtitle">
                    Hayallerinizdeki düğün için mükemmel mekanlar sunuyoruz.
                </p>
            </div>
            <div className="content-section">
                <div className="content-card">
                    <h2 className="card-title">Misyonumuz</h2>
                    <p className="card-text">
                        En özel gününüzü unutulmaz kılmak için profesyonel hizmet sunuyoruz.
                    </p>
                </div>
                <div className="content-card">
                    <h2 className="card-title">Vizyonumuz</h2>
                    <p className="card-text">
                        Düğün sektöründe kalite ve müşteri memnuniyetiyle lider olmak.
                    </p>
                </div>
                <div className="content-card">
                    <h2 className="card-title">Değerlerimiz</h2>
                    <p className="card-text">
                        Güven, kalite ve zarafetle müşterilerimize eşsiz bir deneyim sunmak.
                    </p>
                </div>
            </div>
            <div className="gallery-section">
                <h2 className="card-title">Sponsorlarımız</h2>
                <div className="gallery">
                    <div className="gallery-item">
                        <img src="https://media.istockphoto.com/id/1190043570/tr/foto%C4%9Fraf/d%C3%BC%C4%9F%C3%BCn-t%C3%B6reninde-gelin-ve-damad%C4%B1n-mutlu-d%C3%BC%C4%9F%C3%BCn-foto%C4%9Fraflar%C4%B1-d%C3%BC%C4%9F%C3%BCn-gelene%C4%9Fi-pirin%C3%A7-ve-tah%C4%B1l.jpg?s=2048x2048&w=is&k=20&c=8EZ2xEHjj13qm2n1MIKMstn5HQQkOl7SqhxRnQ3d21E="
                            alt="Düğün Salonu 1" className="gallery-image" />
                        <p className="gallery-text">Sponsor 1</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://media.istockphoto.com/id/1190043570/tr/foto%C4%9Fraf/d%C3%BC%C4%9F%C3%BCn-t%C3%B6reninde-gelin-ve-damad%C4%B1n-mutlu-d%C3%BC%C4%9F%C3%BCn-foto%C4%9Fraflar%C4%B1-d%C3%BC%C4%9F%C3%BCn-gelene%C4%9Fi-pirin%C3%A7-ve-tah%C4%B1l.jpg?s=2048x2048&w=is&k=20&c=8EZ2xEHjj13qm2n1MIKMstn5HQQkOl7SqhxRnQ3d21E="
                            alt="Düğün Salonu 2" className="gallery-image" />
                        <p className="gallery-text">Sponsor 2</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://media.istockphoto.com/id/1190043570/tr/foto%C4%9Fraf/d%C3%BC%C4%9F%C3%BCn-t%C3%B6reninde-gelin-ve-damad%C4%B1n-mutlu-d%C3%BC%C4%9F%C3%BCn-foto%C4%9Fraflar%C4%B1-d%C3%BC%C4%9F%C3%BCn-gelene%C4%9Fi-pirin%C3%A7-ve-tah%C4%B1l.jpg?s=2048x2048&w=is&k=20&c=8EZ2xEHjj13qm2n1MIKMstn5HQQkOl7SqhxRnQ3d21E="
                            alt="Düğün Salonu 3" className="gallery-image" />
                        <p className="gallery-text">Sponsor 3</p>
                    </div>
                    <div className="gallery-item">
                        <img src="https://media.istockphoto.com/id/1190043570/tr/foto%C4%9Fraf/d%C3%BC%C4%9F%C3%BCn-t%C3%B6reninde-gelin-ve-damad%C4%B1n-mutlu-d%C3%BC%C4%9F%C3%BCn-foto%C4%9Fraflar%C4%B1-d%C3%BC%C4%9F%C3%BCn-gelene%C4%9Fi-pirin%C3%A7-ve-tah%C4%B1l.jpg?s=2048x2048&w=is&k=20&c=8EZ2xEHjj13qm2n1MIKMstn5HQQkOl7SqhxRnQ3d21E="
                            alt="Düğün Salonu 4" className="gallery-image" />
                        <p className="gallery-text">Sponsor 4</p>
                    </div>
                </div>
            </div>
            <div className="footer-section">
    <div className="footer-content">
        <p className="footer-text">
            Web sitemiz, düğün mekanları kiralamak isteyen çiftler için mükemmel çözümler sunar. 
            Yıllardır sektörde edindiğimiz tecrübeyle, hayatınızdaki en özel günü unutulmaz anılara dönüştürmek için çalışıyoruz. 
            Geniş mekan seçeneklerimiz, profesyonel hizmet anlayışımız ve müşteri memnuniyetine verdiğimiz önem ile sizlere hayalinizi gerçeğe dönüştürme fırsatı sunuyoruz.
        </p>
        <p className="footer-text">
            Düğün mekanlarımız, modern tasarımları ve zarif dekorasyonlarıyla çiftlere ve misafirlerine eşsiz bir deneyim yaşatır. 
            Farklı konseptlere uygun mekanlarımız, geniş kapasitesi ve teknik donanımı sayesinde her türlü düğün organizasyonuna ev sahipliği yapabilir. 
            Ayrıca, uzman ekibimiz tüm süreç boyunca sizlere rehberlik ederek hayalinizdeki düğünü gerçeğe dönüştürmek için yanınızda olacaktır.
        </p>
        <p className="footer-text">
            Detaylı bilgi almak, mekanlarımızı yerinde ziyaret etmek ve rezervasyon yaptırmak için bizimle iletişime geçebilirsiniz. 
            Size en iyi hizmeti sağlamak için sabırsızlanıyoruz! Unutmayın, hayatınızdaki en özel anları planlamak için buradayız.
        </p>
        <img 
            src="https://media.istockphoto.com/id/1435794871/tr/foto%C4%9Fraf/bride-and-grooms-hands.jpg?s=2048x2048&w=is&k=20&c=Y6Ju2fooOuqQx3JtTFwrgvyy3-nseFxiHzDAJHnsY-E=" 
            alt="Düğün Mekanı" 
            className="footer-image" />
    </div>
    </div>
        </div>
    );
};

export default AboutPage;