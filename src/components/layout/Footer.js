import React from "react";
import "../../Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* GRID CONTENT */}
        <div className="footer-container">
          {/* LOGO */}
          <div className="footer-col">
            <h2>Green Car Wash Club</h2>
            <p>
              Premium vehicle care services with quality, trust & satisfaction.
            </p>
          </div>

          {/* SUPPORT */}
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="/Contactus">Contact Us</a>
              </li>
              <li>
                <a href="/FAQS">FAQs</a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="/AboutUs">About Us</a>
              </li>
            </ul>
          </div>
          {/* UPCOMING BRANCHES */}
          <div className="footer-col branches">
            <h3>Upcoming Branches</h3>

            <div className="branches-grid">
              <ul>
                <li>IDPL</li>
                <li>Begumpet</li>
                <li>Bharat Nagar</li>
                <li>Chaitanyapuri</li>
                <li>Chikkadpally</li>
                <li>Dilsukhnagar</li>
              </ul>

              <ul>
                <li>Hitech City</li>
                <li>Isnapur</li>
                <li>Parade Ground</li>
                <li>Khairatabad</li>
                <li>Lakdikapul</li>
              </ul>
              <ul>
                <li>Madhapur</li>
                <li>Malakpet</li>
                <li>Durgam Cheruvu</li>
                <li>Erragadda</li>
                <li>ECIL</li>
                <li>Habsiguda</li>
              </ul>
            </div>
          </div>
          {/* SOCIAL */}
          <div className="footer-col">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* ✅ FULL WIDTH BOTTOM (FIXED) */}
        <div className="footer-bottom">
          <div className="footer-container bottom-content">
            <p>© {new Date().getFullYear()} Green Car Wash Club</p>

            <p>
              Developed by{" "}
              <a
                href="https://calibrecue.com/"
                target="_blank"
                rel="noreferrer"
              >
                CalibreCue IT Solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
