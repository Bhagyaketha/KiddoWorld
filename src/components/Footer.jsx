
import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="simple-footer">

      <div className="footer-content">

        <div className="footer-logo">
          <h2>KiddoWorld</h2>
          <p>Little things, big smiles! 💕</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/Shop">Shop</Link>
          <Link to="/Wishlist">Wishlist</Link>
          <Link to="/Cart">Cart</Link>
          <Link to="/Profile">Profile</Link>
          <Link to="/HelpSupport">Help & Support</Link>
        </div>

        <div className="footer-social">

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            📸
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            💗
          </a>

          <a
            href="https://www.pinterest.com/"
            target="_blank"
            rel="noreferrer"
          >
            📌
          </a>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 KiddoWorld • Made with 💕
      </div>

    </footer>
  );
};

export default Footer;

