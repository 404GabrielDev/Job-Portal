import "./Header.css";
import useGlobalContext from "../../context/UseContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const {
    getAccessTokenSilently,
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
  } = useAuth0();

  const {
    globalisAuthenticated,
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

  /*const loginUrl = `https://${
    import.meta.env.VITE_AUTH0_DOMAIN
  }/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${
    import.meta.env.VITE_CLIENT_URL
  }/callback`;*/

  /* esse botão de logout está funcionando, porém ao deslogar pede pra logar denovo
  const handleLogout = () => {
    window.location.href = "https://dev-hd4hv8571vxyorpp.us.auth0.com/logout";
  };*/

  //teste usando a lib Authh0
  /*Teste falho
  const handleLogout = () => {
    window.location.href = "http://localhost:8000/logout";
  };*/

  /*onClick={() => {
                        // Pequeno atraso antes do redirecionamento
                        window.location.href = `https://dev-hd4hv8571vxyorpp.us.auth0.com/v2/logout?client_id=8hmnwY9zK0D1zcm4ptBxDSNk0f3a3Tzv&returnTo=http://localhost:5173&federated`;
                        setIsAuthenticated(false);
                        setAuth0User(null);
                      }}*/

  const fetchProtectData = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("Acesso ao token", token);

      const response = await fetch("http://localhost:8000/callback", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Dados protegidos", data);
    } catch (error) {
      console.error("Erro ao buscar dados protegidos", error);
    }
  };

  return (
    <header>
      <div>
        <Link to="/">
          <img
            className="iconBusiness"
            src="/businessman.png"
            alt="icone do site"
          />
        </Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link className="LinkNav-style" to="/searchjobs">Procurar Vagas</Link>
        </li>
        <li>
          <Link className="LinkNav-style" to="/myjobs">Meus trabalhos</Link>
        </li>
        <li>
          <Link className="LinkNav-style" to="/post">Postar Vagas</Link>
        </li>
      </ul>

      {globalisAuthenticated ? (
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
                    <img alt="setting" src="/setting.png" />
                    <p>Settings</p>
                  </li>
                  <li>
                    <img alt="logout" src="/logout.png" />
                    <a href={"http://localhost:8000/logout"}>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <a href={"http://localhost:8000/login"}>Login</a>
        </>
      )}
    </header>
  );
};

export default Header;
