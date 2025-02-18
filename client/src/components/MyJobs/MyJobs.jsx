import "./MyJobs.css";
import useJobContext from "../../context/UseJobContext";
import React, { useEffect, useState } from "react";
import UseGlobalContext from "../../context/UseContext";
import { useNavigate } from "react-router-dom";
import JobItem from '../jobItem/JobItem'
const MyJobs = () => {
  const { userJobs, jobs } = useJobContext();

  const { globalisAuthenticated, loading, userProfile } = UseGlobalContext();

  const [activeTab, setActiveTab] = useState("posts");

  const userId = userProfile?.id;


  useEffect(() => {
        if(!loading && !globalisAuthenticated) {
          window.location.href = 'http://localhost:8000/login'
        }
      }, [globalisAuthenticated])

  //redirecionar pro login, se não estiver autenticado
  const likedJobs = jobs.filter((job) => {
    return job.applicants.includes(userId);
  });

  if (loading) {
    return null;
  }

  return (
    <div>
      <div className="button-topMyJobs">
        <button
          className={`border ${
            activeTab === "posts" ? "border-transparent" : "border-gray"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Minhas Postagens
        </button>

        <button
          className={`border ${
            activeTab === "likes" ? "border-transparent" : "border-gray"
          }`}
          onClick={() => setActiveTab("likes")}
        >
          Vagas Salvas
        </button>
      </div>

      {activeTab === "posts" && userJobs.length === 0 && (
        <div>
          <p>Nenhuma postagem de vaga encontrada.</p>
        </div>
      )}

      {activeTab === "likes" && likedJobs.length === 0 && (
        <div>
          <p>Vagas Salvas não encontradas.</p>
        </div>
      )}

      <div>
        {activeTab === "posts" && userJobs.map((job) => <JobItem key={job._id} job={job} /> )}

        {activeTab === "likes" && likedJobs.map((job) => <JobItem key={job._id} job={job} />)}
      </div>
    </div>
  );
};

export default MyJobs;
