import react from "react"
import "./ContactUs.css";

const ContactUs = () => {
    return (
        <div class="contact_us_6">
            <div class="responsive-container-block container">
                <form class="form-box">
                    <div class="container-block form-wrapper">
                        <div class="mob-text">
                            <p class="text-blk contactus-head">
                                Bize Mesajını ilet
                            </p>
                            <p class="text-blk contactus-subhead">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis diam lectus sapien.
                            </p>
                        </div>
                        <div class="responsive-container-block" id="i2cbk">
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i10mt-3">
                                <p class="text-blk input-title">
                                    İsim Soyisim
                                </p>
                                <input class="input" id="ijowk-3" name="FirstName" placeholder="İsminizi Giriniz" />
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="ip1yp">
                                <p class="text-blk input-title">
                                    Mail Adresi
                                </p>
                                <input class="input" id="ipmgh-3" name="Email" placeholder="Mail adresinizi Giriniz" />
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="ih9wi">
                                <p class="text-blk input-title">
                                    Telefon numarası
                                </p>
                                <input class="input" id="imgis-3" name="PhoneNumber" placeholder="Telefon numaranızı giriniz" />
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-3">
                                <p class="text-blk input-title">
                                    Açıklama
                                </p>
                                <textarea class="textinput" id="i5vyy-3" placeholder="Açıklama yazınız"></textarea>
                            </div>
                        </div>
                        <button class="submit-btn" id="w-c-s-bgc_p-1-dm-id-2">
                            Gönder
                        </button>
                    </div>
                </form>
                <div class="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12" id="i772w">
                    <div class="map-part">
                        <p class="text-blk map-contactus-head" id="w-c-s-fc_p-1-dm-id">
                            Bizimle iletişime Geç
                        </p>
                        <p class="text-blk map-contactus-subhead">
                            Telefon Numaramız : +90 123 456 78 90

                            Ya da aşağıdaki sosyal medya hesaplarından bize ulaşabilirsin
                        </p>
                        <div class="social-media-links mob">
                            <a class="social-icon-link" href="https://x.com/" id="ix94i-2-2">
                                <img class="link-img image-block" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png" />
                            </a>
                            <a class="social-icon-link" href="https://www.facebook.com/?locale=tr_TR" id="itixd">
                                <img class="link-img image-block" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png" />
                            </a>
                            <a class="social-icon-link" href="https://www.google.com/?hl=tr" id="izxvt">
                                <img class="link-img image-block" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png" />
                            </a>
                            <a class="social-icon-link" href="https://www.instagram.com/anl.enes/" id="izldf-2-2">
                                <img class="link-img image-block" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png" />
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
}

export default ContactUs;