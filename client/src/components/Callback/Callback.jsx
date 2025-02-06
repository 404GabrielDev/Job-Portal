import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseGlobalContext from "../../context/UseContext";
import axios from "axios";



const Callback = () => {
  const { setIsAuthenticated, setUserProfile, setAuth0User } =
    UseGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.hash.substring(1));
      const token = params.get("access_token");
    
      if (token) {
        localStorage.setItem("auth_token", token); // Salva o token no localStorage
    
        // Adiciona o token no header da requisição
        try {
          const response = await axios.get('/api/v1/check-auth', {
            headers: {
              Authorization: `Bearer ${token}` // Envia o token nas requisições para o backend
            }
          });
    
          // Atualiza o estado com os dados retornados do backend
          setIsAuthenticated(response.data.auth);
          setAuth0User(response.data.user);
          console.log("dados do contexto global apos corrigir a logica de callback", setIsAuthenticated, setAuth0User)
    
          if (response.data.auth) {
            setUserProfile(response.data.user);
          }
    
          navigate("/"); // Redireciona para a página principal
        } catch (error) {
          console.error("Erro ao obter dados do usuário", error);
          navigate("/"); // Se der erro, redireciona para a página de login
        }
      } else {
        console.error("Erro ao obter o token");
        navigate("/"); // Caso não tenha token, redireciona para o login
      }
    };
    
  
    handleAuth();
  }, [navigate, setIsAuthenticated, setAuth0User, setUserProfile]);
  

  return (
    <div>
      <h1>Processando Login</h1>
    </div>
  );
};

export default Callback;
