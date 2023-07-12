import React from 'react'
import "./Footer.css"

export const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
            <div className="box1">
                <ul>
                    <li>
                        Terms of use
                    </li>
                    <li>
                        Blog
                    </li>
                    <li>
                        FAQ
                    </li>
                    <li>
                        Watch List
                    </li>
                </ul>
                <p>ShowPlace, LLC ("Movies Anywhere", "we", "us" "our") welcomes you to the Movies Anywhere Service. The "Movies Anywhere Service" includes the Movies Anywhere website, application and associated content and services</p>
            </div>
            <div className="box">
                <h3>Follow Us </h3>
                <i className='fab fa-facebook-f'></i>
                <i className='fab fa-twitter'></i>
                <i className='fab fa-youtube'></i>
                <i className='fab fa-instagram'></i>
            </div>
            <div className="box">
                <h3>ShowPlace</h3>
                <div className="img flexSB ">

                </div>
            </div>
        </div>
      </footer>
    </>
  )
}


