import "./Header.css";
import useGlobalContext from "../../context/UseContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    userProfile,
    setUserProfile,
    setAuth0User,
  } = useGlobalContext();

  const [dropDown, setDropDown] = useState(false);

  const navigate = useNavigate();

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const { profilePicture, name, profession, email } = userProfile;

  console.log("Dados de userProfile aqui:", userProfile);

  const loginUrl = `https://${
    import.meta.VITE_AUTH0_DOMAIN
  }/authorize?client_id=${import.meta.VITE_CLIENT_ID}&redirect_uri=${
    import.meta.VITE_CLIENT_URL
  }/callback`;

  console.log("informações do user profile aqui:", userProfile);

  const handleLogout = () => {
    // Limpar as informações locais de usuário
    setUserProfile({});
    setIsAuthenticated(false);
    setAuth0User(false);

    // URL de logout do Auth0
    //const logoutURL = `https://${import.meta.env.VITE_AUTH0_DOMAIN}/v2/logout?client_id=${import.meta.env.VITE_CLIENT_ID}&returnTo=${import.meta.env.VITE_CLIENT_URL}`;
    //const logoutURL = `https://dev-hd4hv8571vxyorpp.us.auth0.com/logout`;

    // Redirecionar para o Auth0 para fazer o logout
    //window.location.href = logoutURL;

    navigate('/')
  };

  const handleLogin = async () => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = `${import.meta.env.VITE_CLIENT_URL}/callback`

    const loginURL = `https://${domain}/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;
    console.log("URL DO LOGIN AQUI:", loginUrl)
    try {
      window.location.href = loginURL;
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <header>
      <div>
        <Link to="/home">
          <img
            className="iconBusiness"
            src="businessman.png"
            alt="icone do site"
          />
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/searchjobs">Procurar Vagas</Link>
        </li>
        <li>
          <Link to="/myjobs">Meus trabalhos</Link>
        </li>
        <li>
          <Link to="/postjob">Postar Vagas</Link>
        </li>
      </ul>

      {isAuthenticated ? (
        <>
          <div className="container-allDropdown">
            <div id="nav-profile" onClick={toggleDropDown}>
              <button>Profile</button>
            </div>

            {dropDown && (
              <div
                className={`container-dropDown ${dropDown ? "visible" : ""}`}
              >
                <div className="container-nameProfile">
                  <p>{name}</p>
                  <p>{email}</p>
                </div>
                <ul className="container-configProfile">
                  <li>
                    <img src="/setting.png" />
                    <p>Settings</p>
                  </li>
                  <li>
                    <img src="/logout.png" />
                    <p onClick={handleLogout}>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link onClick={handleLogin} className="nav-login">
            Login com o google
          </Link>
          <button className="nav-login">Register</button>
        </>
      )}
    </header>
  );
};

export default Header;
