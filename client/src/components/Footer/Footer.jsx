import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container-footer">
      <div className="footerAll-section">
        <div className="btn-tels">
          <img src="/logotipo.png" alt="logotipo" />
          <button>Tel. 99 99999-9999</button>
          <button>Tel. 99 99999-9999</button>
          <button>Contato</button>
        </div>

        <div className="footer-section2">
          <p>Menu</p>
          <div className="links-footer">
            <Link to="/searchjobs">Procurar Vagas</Link>
            <Link to="/post">Postar Vaga</Link>
            <Link to="/myjobs">Minhas Postagens</Link>
          </div>
        </div>

        <div className="footer-section3">
          <p>Redes Sociais</p>

          <div className="container-imgsFooter">
            <img id="icon-redesSociais" src="/youtube.png" alt="icon-youtube" />
            <img
              id="icon-redesSociais"
              src="/instagram.png"
              alt="icon-instagram"
            />
            <img
              id="icon-redesSociais"
              src="/facebook.png"
              alt="icon-facebook"
            />
          </div>
        </div>
      </div>

      <div className="footer-section4">
        <p>
          © 2025 | JobWay - MERN STACK - Desenvolvido por
          <span>João Gabriel</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
