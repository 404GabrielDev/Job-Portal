import React, { useState } from "react";
import UseJobContext from "../../context/UseJobContext";
import UseGlobalContext from "../../context/UseContext";
import FindWork from "../ui/FindWork";
import "./SearchJobs.css";
import JobCard from "../jobItem/JobCard";
import JobItem from "../jobItem/JobItem";
import { useNavigate } from "react-router-dom";
import Filters from "../ui/Filters";

const SearchJobs = () => {
  const [colums, setColums] = useState(3);

  const { likeJob, jobs, applyJob, filters } = UseJobContext();
  const { userProfile, globalisAuthenticated } = UseGlobalContext();

  const [isLiked, setIsLiked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // alterna dinamicamente o número de colunas entre 1, 2 e 3
  const toggleGridColums = () => {
    setColums((prev) => (prev === 3 ? 2 : prev === 2 ? 1 : 3));
  };

  const getIcon = () => {
    if (colums === 3) return "/gridView.png";
    if (colums === 2) return "/tableView.png";
    return "/listView.png";
  };

  const filtredJobs =
    filters.fullTime || filters.partTime || filters.contract || filters.internet
      ? jobs.filter((job) => {
          if (filters.fullTime && job.jobType.includes("Full Time"))
            return true;

          if (filters.partTime && job.jobType.includes("Part Time"))
            return true;

          if (filters.contract && job.jobType.includes("Contract")) return true;

          if (filters.internship && job.jobType.includes("internship"))
            return true;

          if(filters.fullstack && job.tags.includes("Full Stack")) return true;

          if(filters.backend && job.tags.includes("Backend")) return true;

          if(filters.devOps && job.tags.includes("devOps")) return true;
          
          if(filters.uiux && job.tags.includes("UI/UX")) return true;
        })
      : jobs;

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
          {jobs.length > 0 ? (
            filtredJobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <div>No Jobs Found!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
