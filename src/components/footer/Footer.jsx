import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="brand">
            <h2>ShowPlace</h2>
            <p>Your ultimate destination for streaming entertainment.</p>
            <div className="social-links">
              <a href="https://facebook.com/showplace" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com/showplace" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/showplace" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/showplace" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/trending">Trending</Link></li>
            <li><Link to="/popular">Popular</Link></li>
            <li><Link to="/top-rated">Top Rated</Link></li>
            <li><Link to="/upcoming">Coming Soon</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/genre/28">Action</Link></li>
            <li><Link to="/genre/35">Comedy</Link></li>
            <li><Link to="/genre/18">Drama</Link></li>
            <li><Link to="/genre/27">Horror</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Download App</h3>
          <div className="app-buttons">
            <a href="https://play.google.com/store/apps/showplace" className="app-button" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-google-play"></i>
              <div className="button-text">
                <span>GET IT ON</span>
                <strong>Google Play</strong>
              </div>
            </a>
            <a href="https://apps.apple.com/app/showplace" className="app-button" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-apple"></i>
              <div className="button-text">
                <span>Download on the</span>
                <strong>App Store</strong>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-info">
          <p>&copy; {currentYear} ShowPlace. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


