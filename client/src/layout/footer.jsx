import React from 'react';

const Footer = () =>  {
        return(
            <footer className="footer">
                <div className="container">
                    <ul className="nav">
                    <li className="nav-item">
                        <a href="#!" className="nav-link"> Creative Tim </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link"> About Us </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link"> Blog </a>
                    </li>
                    </ul>
                    <div className="copyright">
                    ©
                    {new Date().getFullYear()}
                    made with <i className="tim-icons icon-heart-2"></i> by
                    <a href="#!" target="_blank">Creative Tim</a> for a
                    better web.
                    </div>
                </div>
            </footer>
        )
}

export default Footer;