import { useContext } from "react";
import {JobsContext} from "./jobsContext";

const UseJobContext = () => {
    return useContext(JobsContext)
}

export default UseJobContext