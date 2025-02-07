import React from "react";
import "./JobForm.css";
import useGlobalContext from "../../context/UseContext";
import JobDetails from "./JobDetails";
import JobLocation from "./JobLocation";
import JobSkills from "./JobSkills";
import JobTitle from "./JobTitle";

const JobForm = () => {
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
  } = useGlobalContext();

  const sections = ["About", "Job Details", "Skills", "Location", "Summary"];
  const [currentSection, setCurrentSection] = React.useState(sections[0]);

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

  return (
    <>
      <div>
        <h1>Criar/publicar uma vaga</h1>
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
          <form action="">
            {renderStages()}
            <div id="button-nextSections">
              {currentSection !== "Summary" && (
                <button
                  onClick={() => {
                    const currentIndex = sections.indexOf(currentSection);

                    setCurrentSection(sections[currentIndex + 1])
                  }}
                  type="button"
                >
                  Next
                </button>
              )}
            </div>

            {currentSection === "Summary" && (
              <button type="submit">Post Job</button>
            )}
          </form>
        </section>
      </div>
    </>
  );
};

export default JobForm;
