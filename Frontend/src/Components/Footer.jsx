import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Footerr() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-col">
          <h4>Contact info</h4>
          <p>
            <strong>Call us</strong>
            <br />
            +91-62XXXXXXXX
          </p>
          <p>
            <strong>Mail</strong>
            <br />
            eventify@gmail.com
          </p>
          <div className="social-icons">
            <i className="pi pi-facebook"></i>
            <i className="pi pi-twitter"></i>
            <i className="pi pi-pinterest"></i>
            <i className="pi pi-instagram"></i>
          </div>
        </div>

        <div className="footer-col footer-col-center">
          <h4>Use Eventify</h4>
          <ul>
            <li>
              <Link to="#" onClick={scrollToTop}>Home</Link>
            </li>
            <li>
              <Link to="/events" onClick={scrollToTop}>Events</Link>
            </li>
            <li>
              <Link to="/movies" onClick={scrollToTop}>Movies</Link>
            </li>
            <li>
              <Link to="/my-tickets" onClick={scrollToTop}>My Tickets</Link>
            </li>
            <li>
              <Link to="/about" onClick={scrollToTop}>About Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col footer-col-right">
          <h4>Help & Support</h4>
          <ul>
            <li>Contact us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Refund and Cancellation</li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <h2 className="footer-brand"> 🎟️ Eventify</h2>
        <p>©2025 All Rights Reserved. Eventify.</p>
      </div>
    </footer>
  );
}
