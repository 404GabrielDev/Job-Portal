import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseGlobalContext from "../../context/UseContext";
import { useAuth0 } from "@auth0/auth0-react";

const Callback = () => {
  const {
    setIsAuthenticated,
    setUserProfile,
    setAuth0User,
    globalisAuthenticated,
    userProfile,
    auth0User,
  } = UseGlobalContext();
  
  const {IsAuthenticated, user} = useAuth0()
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if(IsAuthenticated) {
        console.log("Usuario Logado:", user)
        navigate("/")
      }
    } catch (error) {
      console.log("Erro na lógica de autenticação", error)
    }
    
  }, [IsAuthenticated, user, navigate])


  return (
    <div>
      <h1>Processando Login</h1>
    </div>
  );
};

export default Callback;
