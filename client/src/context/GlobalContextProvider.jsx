import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext.js";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

 const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/check-auth");
        console.log("mostrando o que tem em data", res.data);
        setIsAuthenticated(res.data.auth);
        console.log("Resultado de isAuthenticated, data", res.data.auth)
        setAuth0User(res.data.user);
        console.log("Resultado de res.data.user", res.data.user)
        setLoading(false);
      } catch (error) {
        console.log("Erro ao checar autenticação", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const getUserProfile = async (id) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`);

      setUserProfile(res.data);
    } catch (error) {
      console.log("Erro ao obter o perfil do usuario", error);
    }
  };

  useEffect(() => {
    if(isAuthenticated && auth0User) {
        getUserProfile(auth0User.sub);
    }
  }, [isAuthenticated, auth0User])

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        auth0User,
        setAuth0User,
        userProfile,
        setUserProfile,
        getUserProfile,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
