import "./Header.css";
import useGlobalContext from "../../context/UseContext";
import { useState } from "react";

const Header = () => {
  const { isAuthenticated } = useGlobalContext();

  const [dropDown, setDropDown] = useState(false);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  console.log("Autenticação do Header", isAuthenticated);

  return (
    <header>
      <div>
        <img
          className="iconBusiness"
          src="businessman.png"
          alt="icone do site"
        />
      </div>

      <ul className="nav-links">
        <li>Procurar Emprego</li>
        <li>Meus Trabalhos</li>
        <li>Postar um Emprego</li>
      </ul>

      {isAuthenticated ? (
        <>
          <div id="nav-profile" onClick={toggleDropDown}>
            <button>Profile</button>

            {dropDown && (
              <div className={`container-dropDown ${dropDown ? 'visible' : ''}`}>
                <button>Your Email</button>
                <button>Logout</button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="nav-login">Login</div>
          <div className="nav-login">Register</div>
        </>
      )}
    </header>
  );
};

export default Header;
