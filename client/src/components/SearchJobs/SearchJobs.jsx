import React, { useEffect, useState } from "react";
import UseJobContext from "../../context/UseJobContext";
import UseGlobalContext from "../../context/UseContext";
import FindWork from "../ui/FindWork";
import "./SearchJobs.css";
import JobCard from "../jobItem/JobCard";
import JobItem from "../jobItem/JobItem";
import { useNavigate } from "react-router-dom";
import Filters from "../ui/Filters";
import SalarySlider from "../SalarySlider/SalarySlider";
import toast from "react-hot-toast";

const SearchJobs = () => {
  const [colums, setColums] = useState(3);

  const { likeJob, jobs, applyJob, filters } = UseJobContext();
  const { userProfile, globalisAuthenticated } = UseGlobalContext();

  const [isLiked, setIsLiked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const [salaryRange, setSalaryRange] = useState([0, 100000]);

  // alterna dinamicamente o número de colunas entre 1, 2 e 3
  const toggleGridColums = () => {
    setColums((prev) => (prev === 3 ? 2 : prev === 2 ? 1 : 3));
  };

  const getIcon = () => {
    if (colums === 3) return "/gridView.png";
    if (colums === 2) return "/tableView.png";
    return "/listView.png";
  };

  const filtredJobs = jobs.filter((job) => {
    const matchesJobType =
      (!filters.fulltime || job.jobType.includes("Full Time")) &&
      (!filters.partTime || job.jobType.includes("Part Time")) &&
      (!filters.contract || job.jobType.includes("Contract")) &&
      (!filters.internship || job.jobType.includes("Internship")) &&
      (!filters.temporary || job.jobType.includes("Temporary"));

    const matchesSkills =
      (!filters.fullstack || job.tags.includes("fullStack")) &&
      (!filters.backend || job.tags.includes("backend")) &&
      (!filters.devOps || job.tags.includes("devOps")) &&
      (!filters.uiux || job.tags.includes("uiux"));
    const matchesSalary =
      job.salary >= salaryRange[0] && job.salary <= salaryRange[1];

    return matchesJobType && matchesSkills && matchesSalary;
  });

  useEffect(() => {
    let toastId;

    if (filtredJobs.length === 0) {
      toastId = toast.error("Nenhuma vaga encontrada com esse filtro", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    // Cleanup: remove o toast quando os filtros mudam novamente
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [filtredJobs]);

  return (
    <div className="containerAll-pageWork">
      <div className="container-findWork">
        <h1>Procure Seu Proximo Trabalho Aqui</h1>
        <FindWork />
      </div>

      <div className="containerAll-viewMode">
        <h2>Recent Jobs</h2>
        <button className="btn-viewMode" onClick={toggleGridColums}>
          <span>
            {colums === 3
              ? "Grid View"
              : colums === 2
              ? "Table View"
              : "List View"}
          </span>
          <span>
            <img src={getIcon()} alt="view-mode" style={{ maxWidth: "20px" }} />
          </span>
        </button>
      </div>

      <div className="containerAll-jobsHome">
        <div className="container-Filter">
          <Filters />
          <div className="container-salaryRange">
            <SalarySlider value={salaryRange} onChange={setSalaryRange} />
          </div>
        </div>

        <div
          className={`job-list ${
            colums === 3
              ? "grid-cols-3"
              : colums === 2
              ? "grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {filtredJobs && filtredJobs.length > 0 ? (
            filtredJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <h1>nenhuma Vaga encontrada com esse Filtro</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
