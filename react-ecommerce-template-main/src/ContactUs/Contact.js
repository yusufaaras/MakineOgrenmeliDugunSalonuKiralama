import React, { useState } from "react";
import "./ContactUs.css";
import axios from "axios";


const ContactUs = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { fullName, email, phoneNumber, description };

        try {
            const response = await axios.post("https://localhost:7072/api/Mail", data);
            if (response.status === 200) {
                alert("iletişim bilgileriniz başarı ile gönderildi!");
                setFullName("");
                setEmail("");
                setPhoneNumber("");
                setDescription("");
            }
        } catch (error) {
            console.error("Gönderme hatası:", error);
            alert("Mesaj gönderilirken bir hata oluştu.");
        }
        console.log("Gönderilen veri:", data);

    };

    return (
        <div className="contact_us_6">
            <div className="responsive-container-block container">
                <form onSubmit={handleSubmit} className="form-box">
                    <div className="container-block form-wrapper">
                        <div className="mob-text">
                            <p className="text-blk contactus-head">Bize Mesajını ilet</p>
                            <p className="text-blk contactus-subhead">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis diam lectus sapien.
                            </p>
                        </div>
                        <div className="responsive-container-block" id="i2cbk">
                            <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i10mt-3">
                                <p className="text-blk input-title">İsim Soyisim</p>
                                <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="İsminizi Giriniz" />
                            </div>
                            <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="ip1yp">
                                <p className="text-blk input-title">Mail Adresi</p>
                                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Mail adresinizi Giriniz" />
                            </div>
                            <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="ih9wi">
                                <p className="text-blk input-title">Telefon numarası</p>
                                <input className="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Telefon numaranızı giriniz" />
                            </div>
                            <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-3">
                                <p className="text-blk input-title">Açıklama</p>
                                <textarea className="textinput" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Açıklama yazınız"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="submit-btn" id="w-c-s-bgc_p-1-dm-id-2">
                            Gönder
                        </button>
                    </div>
                </form>

                <div className="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12" id="i772w">
                    <div className="map-part">
                        <p className="text-blk map-contactus-head" id="w-c-s-fc_p-1-dm-id">
                            Bizimle iletişime Geç
                        </p>
                        <p className="text-blk map-contactus-subhead">
                            Telefon Numaramız : +90 123 456 78 90
                            <br />
                            Ya da aşağıdaki sosyal medya hesaplarından bize ulaşabilirsin
                        </p>
                        <div className="social-media-links mob">
                            <a className="social-icon-link" href="https://x.com/">
                                <img className="link-img image-block" alt="" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png" />
                            </a>
                            <a className="social-icon-link" href="https://www.facebook.com/?locale=tr_TR">
                                <img className="link-img image-block" alt="" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png" />
                            </a>
                            <a className="social-icon-link" href="https://www.google.com/?hl=tr">
                                <img className="link-img image-block" alt="" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png" />
                            </a>
                            <a className="social-icon-link" href="https://www.instagram.com/anl.enes/">
                                <img className="link-img image-block" alt="" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png" />
                            </a>
                        </div>
                        <div>
                            <iframe
                                title="Isparta Uygulamalı Bilimler Üniversitesi"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1224.5999562591694!2d30.523490274861864!3d37.829874991203226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c5c9d6901e42af%3A0xd8c2b3a4ec1841e!2sIsparta%20Uygulamal%C4%B1%20Bilimler%20%C3%9Cniversitesi%20Teknoloji%20Fak%C3%BCltesi!5e0!3m2!1str!2str!4v1748083164096!5m2!1str!2str"
                                width="700px"
                                height="570px"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
