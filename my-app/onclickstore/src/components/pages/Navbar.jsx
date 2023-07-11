/* eslint-disable no-undef */
import React, { useState } from 'react';
import "../../styles/bootstrap/Navbar.scss";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
  const [show, setShow] = useState(true);

  const toggleNavbar = () => {
    setShow(!show);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand-info" to="HomePage">
          {' '}
          <img src="./logos.PNG" className="img-fluid" alt=" OnClickstore" />
        </Link>
        <button
          className="navbar-toggler border border-info text-info"
          onClick={toggleNavbar}
        >
          {show ? <AiOutlineMenu /> : <AiOutlineClose />}
        </button>

        <div
          className={show ? 'collapse navbar-collapse' : 'collapse navbar-collapse-active'}
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item text-light active">
              <Link className="nav-link" to="HomePage">
                Movies
              </Link>
            </li>
            <li className="nav-item text-light">
              <Link className="nav-link" to="SinglePage">
                SinglePage
              </Link>
            </li>
            <li className="nav-item text-light">
              <Link className="nav-link" to="Services">
                Services
              </Link>
            </li>
            <li className="nav-item text-light">
              <Link className="nav-link" to="Contact">
                Pages 
              </Link>
            </li>
            <li className="nav-item text-light">
              <Link className="nav-link" to="Users">
                Pricing 
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
               
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          
          <div className='account flexSB'>
            <i className='fa fa-search'></i>

          </div>
          <button className='btn btn-outline-danger'> Subscribe Now </button>
        </div>
      </div>
    </nav>

  );
}

// eslint-disable-next-line no-unused-vars
function CustomLink({children, ...props}){
  const resolvedPath= useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname, end: true})
  return (
  <li className= {isActive ? "active" :""}>
    <Link to ={to}{...props}>
      {children}
    </Link>
  </li>
  )

}