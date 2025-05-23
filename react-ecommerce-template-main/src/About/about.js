// src/pages/AboutPage.js
import React from 'react';
import './AboutPage.css'; // Stil dosyamızı import ediyoruz
import heroBackground from './İmages/ekibimiz.jpg';
import personelimage from "./İmages/garson-kiralama.jpg"
import kırdugun from "./İmages/kır-düğün.jpeg";
import denizdugun from "./İmages/deniz-dugun.jpg"
import bogazdugun from "./İmages/boğaz-dugun.jpg"
import atinadugun from "./İmages/atina-dugun.jpg"
import oteldugun from "./İmages/otel-dugun.jpg"
import saraydugun from "./İmages/saray-dugun.jpg"
import sahildugun from "./İmages/sahildugun.jpg"
import mekandugun from "./İmages/mekan-dugun.jpg"
import dugunicecek from "./İmages/dugunicecek.jpg"
const About = () => {
    return (
        <div className="about-page-wrapper">
            {/* About Us Banner Section */}
            <section
                className="about-banner-section"
                style={{ backgroundImage: `url(${heroBackground})` }} // Arka plan resmini inline style ile ekle
            >
                <div className="container banner-content"> {/* Yeni bir sınıf ekledik */}
                    <h1 className="banner-heading hero-text-3d">About Us</h1> {/* 3D efekt için yeni sınıf */}
                </div>
            </section>

            {/* Main About Us Content (Kalan kod aynı kalıyor) */}
            <section className="about-main-content">
                <div className="container">
                    <div className="pitch-section">
                        <p className="pitch-text">
                            Başladığımızdan beri insanlara en iyi düğünü yaptırabilmekle ilgiliyiz.
                            En yüksek performans ve çalışma azmiyle sizlerin mutluluğunu elde ediyoruz.
                        </p>
                        <p className="credo-text">Merak etmeyin. En iyi düğün sizin ki olacak</p>
                    </div>

                    <div className="image-gallery">
                        {/* Not: Bu görsellerin projenizin assets klasörüne taşınması ve import edilmesi önerilir.
                            Şimdilik orijinal URL'leri korundu. */}
                        <img
                            src={personelimage}
                            alt=""
                            className="brewer-image"
                        />
                        <img
                            src={kırdugun}
                            alt=""
                            className="name-badge-sticker"
                        />
                    </div>
                    <h2>Biz Kimiz?</h2>
                    <p className="about-blurb">
                        Biz,Çalışma ofisi istanbul üsküdarda olan tek hedefi insanlara en iyi hizmeti vererek onları hayal ettikleri düğünlere
                        kavuşmasını sağlayan bir ekipiz. Bu ekip varını yoğunu siz müşterilerimiz için veriyoruz. Sizin bu ücretsiz sitemizi
                        ziyaret ederek mutlu ayrılcağınızın garantisini bile verebiliriz. Hadi ne duruyorsunuz. Sizde biran önce giriş yapın ve
                        hayalinizdeki düğüne bir adım daha yaklşın.
                    </p>

                    <img
                        src={denizdugun}
                        alt="A ream of labels on the Sureshot canning line"
                        className="video-placeholder-image"
                    />
                </div>
            </section>

            {/* How It Started Section */}
            <section className="how-it-started-section">
                <div className="container">
                    <h1 className="section-heading">Nasıl Başladı?</h1>
                    <div className="beginning-content">
                        <div className="beginning-blurb">
                            <p>
                                2007 yılında her şeye sıfırdan başladık. Başından beri de yarattığımız hikayeyi ve
                                çiftlerin en mutlu gününe dokunabilmeyi çok sevdik.
                                Kurucularımız Anıl Enes Torun ve Yusuf Aras uzun yıllar Amerika’da düğün planlama alanında çalıştıktan
                                sonra Türkiye’ye gelip Düğün.com’u yarattı. O gün bu gündür düğün sektörü bizden soruluyor.
                                Sektörü domine ederek çok büyük bir market yarattık.
                            </p>
                        </div>
                        <div ><img src={dugunicecek}></img></div>
                    </div>

                    <div className="facts-grid">
                        <div className="capacity-facts">
                            <h3 className="facts-heading">Çiftler Neden Düğün.com’u Kullanmalı?</h3>
                            <div className="facts-blurb">
                                <p>Düğüne hazırlık sürecini, düğün kadar keyifli hale dönüştürdüğü için</p>
                                <p> Firma firma gezmek yerine binlerce seçeneği çiftlerin ayağına getirdiği için</p>
                                <p>Firmalardan ücretsiz fiyat teklifleri alınabildiği için</p>
                                <p>Bütçem, Ajandam, Oturma Planım gibi araçlarla düğün planlamaya destek olduğu için</p>
                                <p>Çiftlere Düğün.com’a özel kampanya ve indirimler sunduğu için</p>
                                <p>Düğün modasını yakından takip edebilmek için</p>
                            </div>
                        </div>
                        <div className="beer-facts">
                            <h3 className="facts-heading">Firmalar Neden Düğün.com İş Ortağı Olmalı?</h3>
                            <div className="facts-blurb">
                                <p>Arayan değil, aranan firma olmak için</p>
                                <p>Hedef kitleye uygun en doğru çiftlerle eşleşebilmek için</p>
                                <p>Teklifleri çiftlere zahmetsiz ve hızlı bir şekilde iletmek için</p>
                                <p> Düğün.com ayrıcalıklarından yararlanmak için</p>
                                <p> Düğün.com çatısı altında yer alarak, çiftlerin güvenini kazanmak için</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Quote Banner */}
            <section className="quote-banner-section">
                <div className="container">
                    <h1 className="quote-text">
                        Hayalinizdeki Düğüne Sadece Bir Adım Uzaktasınız.
                    </h1>
                </div>
            </section>



            {/* Another About Banner - Duplicate content from original, keeping for structure */}
            {/* Bu bölümdeki unslider scriptleri temizlendi. */}
            <header className="about-banner-alt">
                <div className="container">
                    {/* React Slider Component Placeholder */}
                    <div className="banner-slideshow-alt">
                        {/* Bu bölümde de bir React slider kütüphanesi kullanılmalı */}
                        <img src={bogazdugun} className="slider-image" />
                        <img src={oteldugun} className="slider-image" />
                        <img src={atinadugun} className="slider-image" />
                    </div>
                    <div className="banner-quote-alt">
                        <h3 className="quote-text-alt">
                            Bunlardan biri sizin düğün Salonunuz olabilir.
                        </h3>
                    </div>
                </div>
            </header>
            <section className="animated-gradient-section">
                <div className="container">
                    <h3 className="gradient-quote-text">Ya Da</h3>
                </div>
            </section>

            {/* About Head Section (Text and Slider) */}
            <section className="about-head-section">
                <div className="container">

                    {/* React Slider Component Placeholder */}
                    <div className="head-slideshow-alt">
                        {/* Bu bölümde de bir React slider kütüphanesi kullanılmalı */}
                        <img src={saraydugun} className="slider-image" />
                        <img src={mekandugun} className="slider-image" />
                        <img src={sahildugun} className="slider-image" />
                    </div>
                </div>
            </section>
            <section className="animated-gradient-section">
                <div className="container">
                    <h3 className="gradient-quote-text">Bunlardan Biri Olabilir</h3>
                </div>
            </section>
        </div>
    );
};

export default About;
