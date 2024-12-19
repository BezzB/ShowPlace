/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import "../../styles/bootstrap/Navbar.scss";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setShow(!show);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand-info" to="/">
          <img src="./logos.PNG" className="img-fluid" alt="ShowPlace" />
        </Link>

        <button
          className="navbar-toggler border border-info text-info"
          onClick={toggleNavbar}
          aria-expanded={show}
          aria-label="Toggle navigation"
        >
          {show ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        <div className={show ? 'navbar-collapse-active' : 'collapse navbar-collapse'}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/movies' ? 'active' : ''}`}
                to="/movies"
              >
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/tv-shows' ? 'active' : ''}`}
                to="/tv-shows"
              >
                TV Shows
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/my-list' ? 'active' : ''}`}
                to="/my-list"
              >
                My List
              </Link>
            </li>
          </ul>

          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <div className="search-box">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search movies & series"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isSearching}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                disabled={isSearching}
              >
                {isSearching ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  <AiOutlineSearch />
                )}
              </button>
            </div>
          </form>

          <div className="user-actions">
            <button className='btn btn-outline-danger ms-3'>Subscribe Now</button>
            <div className="profile-menu ms-3">
              <Link to="/profile" className="profile-link">
                <img src="/default-avatar.png" alt="Profile" className="avatar" />
              </Link>
              <div className="dropdown-menu">
                <Link to="/profile">Profile</Link>
                <Link to="/settings">Settings</Link>
                <hr className="dropdown-divider" />
                <button onClick={() => navigate('/logout')}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}