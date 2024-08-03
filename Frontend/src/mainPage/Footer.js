import React, { useEffect } from 'react';
import './Footer.scss';
import ccpaIcon from '../assets/images/ccpa-icon.svg';

const Footer = () => {
    useEffect(() => {
        const scriptModule = document.createElement('script');
        scriptModule.type = 'module';
        scriptModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        document.body.appendChild(scriptModule);

        const scriptNoModule = document.createElement('script');
        scriptNoModule.noModule = true;
        scriptNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        document.body.appendChild(scriptNoModule);
    }, []);

    return (
        <footer className="footer">
            <div className="footContainers">
                <div className="footer-row">
                    <div className="footer-column">
                        <div className="my-account">
                            <h4>MY ACCOUNT</h4>
                            <ul>
                                <li><a href="#">Dashboard</a></li>
                                <li><a href="#">Purchase History</a></li>
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Membership Benefits</a></li>
                                <li><a href="#">Closet</a></li>
                                <li><a href="#">Wish List</a></li>
                                <li><a href="#">Sign Out</a></li>
                            </ul>
                        </div>
                        <div className="careers">
                            <h4>CAREERS</h4>
                            <ul>
                                <li><a href="#">Community</a></li>
                                <li><a href="#">Like New</a></li>
                                <li><a href="#">Sustainability</a></li>
                                <li><a href="#">Social Impact</a></li>
                                <li><a href="#">Diversity And Inclusion</a></li>
                                <li><a href="#">Lululemon Apps</a></li>
                                <li><a href="#">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-column">
                        <div className="help">
                            <h4>HELP</h4>
                            <ul>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Accessibility Statement</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Ordering</a></li>
                                <li><a href="#">Shipping Policy</a></li>
                                <li><a href="#">Returns</a></li>
                                <li><a href="#">Redeem Gift Cards</a></li>
                                <li><a href="#">Sizing</a></li>
                                <li><a href="#">Our Products</a></li>
                            </ul>
                        </div>
                        <div className="gift-cards">
                            <h4>GIFT CARDS</h4>
                            <ul>
                                <li><a href="#">Store Locator</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Your Privacy Choices <img src={ccpaIcon} alt='privary icon' style={{height: '14px', position: 'relative', top: '2px'}}/></a></li>
                                <li><a href="#">California Privacy Rights</a></li>
                                <li><a href="#">California Transparency Act</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-column">
                        <div className="about-us">
                            <h4>ABOUT US</h4>
                            <ul>
                                <li><a href="#">Our Business</a></li>
                                <li><a href="#">Media</a></li>
                                <li><a href="#">Investors</a></li>
                                <li><a href="#">Strategic Sales</a></li>
                                <li><a href="#">Affiliates and Creators</a></li>
                                <li><a href="#">Sweat Collective</a></li>
                                <li><a href="#">FURTHER</a></li>
                            </ul>
                        </div>

                        <ul className="social-icons">
                            <li style={{margin: '0'}}><a href="https://twitter.com/lululemon" target="_blank" aria-label="twitter}">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a></li>
                            <li style={{margin: '0'}}><a href="https://pinterest.com/lululemon" target="_blank" aria-label="pinterest">
                                <ion-icon name="logo-pinterest"></ion-icon>
                            </a></li>
                            <li style={{margin: '0'}}><a href="https://youtube.com/lululemon" target="_blank" aria-label="youtube">
                                <ion-icon name="logo-youtube"></ion-icon>
                            </a></li>
                            <li style={{margin: '0'}}><a href="https://facebook.com/lululemon" target="_blank" aria-label="facebook">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a></li>
                            <li style={{margin: '0'}}><a href="https://instagram.com/lululemon" target="_blank" aria-label="instagram">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <div className="contact-us">
                            <h4>CONTACT US</h4>
                            <ul>
                                <li><a href="#">Live Chat</a></li>
                                <li><a href="#">Email Sign Up</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-legal">
                    <p>© lululemon athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</p>
                    <ul className="footer-legal-right">
                    {/*<div className="footer-legal-right-left"><a>Privacy Policy | </a></div>*/}
                        {/*<div className="footer-legal-right-right"><a>Terms of Use</a></div>*/}
                        <div className="footer-legal-right-left"><a>Privacy Policy</a><p>|</p><a>Terms of Use</a></div>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
