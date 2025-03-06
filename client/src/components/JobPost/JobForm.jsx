import React from "react";
import "./JobForm.css";
import useGlobalContext from "../../context/UseContext";
import JobDetails from "./JobDetails";
import JobLocation from "./JobLocation";
import JobSkills from "./JobSkills";
import JobTitle from "./JobTitle";
import useJobContext from "../../context/UseJobContext";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UseJobContext from "../../context/UseJobContext";
import { toast } from "react-hot-toast";

const JobForm = ({ isEditing }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const {
    jobTitle,
    jobDescription,
    salaryType,
    activeEmployementTypes,
    salary,
    location,
    skills,
    negotiable,
    tags,
    globalisAuthenticated,
    loading,
  } = useGlobalContext();

  useEffect(() => {
    if (!loading && !globalisAuthenticated) {
      window.location.href = "http://localhost:8000/login";
    }
  }, [globalisAuthenticated]);

  const { createJob } = useJobContext();

  const sections = ["About", "Job Details", "Skills", "Location", "Summary"];
  const [currentSection, setCurrentSection] = React.useState(sections[0]);

  /*const handleDescriptionChange = (content) => {
      setJobData({...jobData, description: content})
    }*/

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const renderStages = () => {
    switch (currentSection) {
      case "About":
        return <JobTitle />;

      case "Job Details":
        return <JobDetails />;

      case "Skills":
        return <JobSkills />;

      case "Location":
        return <JobLocation />;
    }
  };

  const getCompletedcolor = (section) => {
    switch (section) {
      case "About":
        return jobTitle && activeEmployementTypes.length > 0
          ? "#7263f3"
          : "gray";

      case "Job Details":
        return jobDescription && salary > 0 ? "#7263f3" : "gray";

      case "Skills":
        return skills.length && tags.length > 0 ? "#7263f3" : "gray";

      case "Location":
        return location.address || location.city || location.country
          ? "#7263f3"
          : "gray";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await axios.put(`/api/v1/jobs/${jobId}`, jobData);
      toast.success("Vaga Atualizada com sucesso!");
      navigate("/myjobs");
    } else {
      createJob({
        title: jobTitle,
        description: jobDescription,
        salaryType,
        jobType: activeEmployementTypes,
        salary,
        location: `${location.address}, ${location.city}, ${location.country}`,
        skills,
        negotiable,
        tags,
      });
      navigate("/");
    }
  };

  return (
    <>
      <div className="container-JobFormAll">
        <div className="createPost-job">
          <h1 id="title-createPost">{isEditing ? "Editar vaga" : "Criar/publicar uma Vaga"}</h1>
        </div>

        <div className="container-pageAll">
          <div>
            <div className="container-sections">
              {sections.map((section, index) => (
                <div className="container-buttonsSection" key={index}>
                  <button
                    key={index}
                    className={`button ${
                      currentSection === section ? "active" : ""
                    }`}
                    onClick={() => handleSectionChange(section)}
                  >
                    {index + 1}
                  </button>
                  <p onClick={() => handleSectionChange(section)}>{section}</p>
                  {currentSection === section && (
                    <span
                      className={`circle ${
                        currentSection === section ? "selected" : ""
                      }${getCompletedcolor(section)}`}
                    >
                      🟢
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <section className="container-formDetails">
            <form action="" onSubmit={handleSubmit}>
              {renderStages()}
              <div id="button-nextSections">
                {currentSection !== "Summary" && (
                  <button
                    id="button-next"
                    onClick={() => {
                      const currentIndex = sections.indexOf(currentSection);

                      setCurrentSection(sections[currentIndex + 1]);
                    }}
                    type="button"
                  >
                    Next
                  </button>
                )}
              </div>

              {currentSection === "Summary" && (
                <button id="btn-postJob" type="submit">
                  Post Job
                </button>
              )}
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default JobForm;
