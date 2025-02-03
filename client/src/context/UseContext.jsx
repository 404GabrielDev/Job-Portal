import { useContext } from "react";
import GlobalContext from "./GlobalContext"; // Corrigido para importar o GlobalContext

const UseGlobalContext = () => {
  return useContext(GlobalContext); // Usar o contexto correto
};

export default UseGlobalContext;
