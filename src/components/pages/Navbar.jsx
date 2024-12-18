/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import "../../styles/bootstrap/Navbar.scss";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setShow(!show);
  };

  useEffect(() => {
    setShow(false);
  }, [location]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // You can implement your search logic here
      // For now, let's navigate to a search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand-info" to="/">
          <img src="./logos.PNG" className="img-fluid" alt="OnClickstore" />
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
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname.includes('/series') ? 'active' : ''}`} 
                to="/series"
              >
                Series
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
          
          <button className='btn btn-outline-danger ms-3'>Subscribe Now</button>
        </div>
      </div>
    </nav>
  );
}