import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useGlobalContext from "./UseContext";
import axios from "axios";
import { toast } from "react-hot-toast";

const JobsContext = createContext();

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const JobsContextProvider = ({ children }) => {
  const { userProfile } = useGlobalContext();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userJobs, setUserJobs] = useState([]);

  const [searchQuery, setSearchQuery] = useState({
    tags: "",
    location: "",
    title: "",
  });

  //filters
  const [filters, setFilters] = useState({
    fulltime: false,
    partTime: false,
    internship: false,
    contract: false,
    fullstack: false,
    backend: false,
    devOps: false,
    uiux: false,
    temporary:false
  });

  const [minSalary, setMinSalary] = useState(30000);
  const [maxSalary, setMaxSalary] = useState(120000);

  //get all jobs
  const getJobs = async () => {
    setLoading(true);

    try {
      const res = await axios.get("/api/v1/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log("Erro ao buscar empregos", error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData) => {
    try {
      const res = await axios.post("/api/v1/jobs", jobData);

      setJobs((prevJobs) => [res.data, ...prevJobs]);

      //atualizar
      if (userProfile._id) {
        setUserJobs((prevUserJobs) => [res.data, ...prevUserJobs]);
      }

      toast.success("Trabalho Criado com sucesso!");
    } catch (error) {
      console.log("Erro ao criar um emprego", error);
      toast.error("Erro ao criar o trabalho");
    }
  };

  const getUserJobs = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/jobs/user/" + userId);

      setUserJobs(res.data);

      setLoading(false);
    } catch (error) {
      console.log("Error getting user jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async (tags, location, title) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (tags) query.append("tags", tags);
      if (location) query.append("location", location);
      if (title) query.append("title", title);

      //enviar requisição

      const res = await axios.get(`/api/v1/jobs/search?${query.toString()}`);

      //set jobs to the responde data
      setJobs(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao pesquisar empregos", error);
    } finally {
      setLoading(false);
    }
  };

  //procurar empregos pelo id

  const getJobById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/jobs/${id}`);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Erro ao buscar emprego pelo id", error);
    } finally {
      setLoading(false);
    }
  };

  //gostar de um emprego
  const likeJob = async (jobId) => {
    console.log("Job Liked", jobId);
    try {
      const res = await axios.put(`/api/v1/jobs/like/${jobId}`);
      console.log("Vaga favoritada com sucesso!", res.data);
      toast.success("Emprego favoritado com sucesso!");
      getJobs();
    } catch (error) {
      console.log("Erro ao dar like nesse emprego", error);
    }
  };

  //aplicar pra um emprego
  const applyToJob = async (jobId) => {
    const job = jobs.find((job) => job._id === jobId);

    if (job && job.applicants.includes(userProfile._id)) {
      toast.error("Você já se candidatou pra essa vaga!");
      return;
    }

    try {
      const res = await axios.put(`/api/v1/jobs/apply/${jobId}`);
      toast.success("Aplicado ao emprego com sucesso!");
      getJobs();
    } catch (error) {
      console.log("Erro ao aplicar ao emprego", error);
      toast.error(error.response.data.message);
    }
  };

  //deletar emprego
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/v1/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      setUserJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast.success("Emprego deletado com sucesso!");
      if (userProfile._id) {
        setUserJobs((prevUserJobs) =>
          prevUserJobs.filter((job) => job._id !== jobId)
        );
      }
    } catch (error) {
      console.log("Erro ao deletar o emprego", error);
    }
  };

  //
  const handleSearchChange = (searchName, value) => {
    setSearchQuery((prev) => ({ ...prev, [searchName]: value }));
  };

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (userProfile._id) {
      getUserJobs(userProfile._id);
    }
  }, [userProfile]);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        createJob,
        userJobs,
        getJobById,
        likeJob,
        applyToJob,
        deleteJob,
        searchJobs,
        handleSearchChange,
        searchQuery,
        setSearchQuery,
        filters,
        minSalary,
        maxSalary,
        setMaxSalary,
        setFilters,
        handleFilterChange,
        setMinSalary
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};

export { JobsContext };
export default JobsContextProvider;
