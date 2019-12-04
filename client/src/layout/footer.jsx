import React from 'react';

const Footer = () =>  {
        return(
            <footer className="footer">
                <div className="container">
                    <ul className="nav">
                    <li className="nav-item">
                        <a href="#!" className="nav-link"> Inicio </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link"> Quienes Somos </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className="nav-link"> Contactanos </a>
                    </li>
                    </ul>
                    <div className="copyright">
                    ©
                    {new Date().getFullYear()}
                    Creado Por <i className="tim-icons icon-heart-2"></i> by
                    <a href="#!" target="_blank">ROUV - Angel - Fabian - Valentin </a>
                    El Mejor Equipo Web
                    </div>
                </div>
            </footer>
        )
}

export default Footer;