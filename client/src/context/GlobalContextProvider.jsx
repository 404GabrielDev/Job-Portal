import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./GlobalContext.js";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [globalisAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

  //estados de inputs
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [activeEmployementTypes, setActiveEmployementTypes] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 0]);
  const [salaryType, setSalaryType] = useState("Por ano");
  const [negotiable, setNegotiable] = useState(false);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [hideSalary, setHideSalary] = useState(false);
  const [location, setLocation] = useState({
    country: "",
    city: "",
    address: "",
  });



  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/check-auth", {
          credentials: "include",
        });
        setIsAuthenticated(res.data.isAuthenticated);
        setAuth0User(res.data.user);
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

  //mudanças de input
  const handleTitleChange = (e) => {
    setJobTitle(e.target.value.trimStart());
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value.trimStart());
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  useEffect(() => {
    if (globalisAuthenticated && auth0User) {
      getUserProfile(auth0User.sub);
    }
  }, [globalisAuthenticated, auth0User]);

  return (
    <GlobalContext.Provider
      value={{
        globalisAuthenticated,
        setIsAuthenticated,
        auth0User,
        setAuth0User,
        userProfile,
        setUserProfile,
        getUserProfile,
        loading,
        jobTitle,
        setJobTitle,
        jobDescription,
        setJobDescription,
        salary,
        activeEmployementTypes,
        salaryType,
        negotiable,
        tags,
        skills,
        location,
        handleTitleChange,
        handleDescriptionChange,
        handleSalaryChange,
        setActiveEmployementTypes,
        setSalaryType,
        setNegotiable,
        hideSalary,
        setHideSalary,
        setTags,
        setSkills,
        setLocation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
