// Footer.js

import React from 'react';
import "./footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          {/* Add more social media links as needed */}
        </div>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
