import React, { useEffect, useState } from "react";
import UseGlobalContext from "../../context/UseContext";
import "./JobTitle.css";

const JobTitle = () => {
  const {
    handleTitleChange,
    jobTitle,
    setJobTitle,
    activeEmployementTypes,
    setActiveEmployementTypes,
  } = UseGlobalContext();

  const [employementTypes, setEmployementTypes] = useState({
    "Full Time": "",
    "Part Time": "",
    Contract: false,
    Internship: false,
    Temporary: false,
  });

  const handleEmployementTypeChange = (type) => {
    setEmployementTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    const selectedTypes = Object.entries(employementTypes)
      .filter(([_, isChecked]) => isChecked)
      .map(([type]) => type);

    setActiveEmployementTypes(selectedTypes);
  }, [employementTypes]);

  return (
    <div className="job-container">
      <div className="container-jobTitle">
        <div className="job-title">
          <h3>Job Title</h3>
          <p>
            A job title is a specific designation of a post in an organization.
          </p>
        </div>

        <div className="container-jobInput">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter Job Title"
          />
        </div>
      </div>
      {/* Título do emprego */}

      <hr />

      {/* Tipo de Emprego */}
      <div className="employment-section">
        <div>
          <h3>Employment Type</h3>
          <p>Select the type of employment.</p>
        </div>

        <div className="container-allCheckbox">
          <div className="checkbox-group">
            {Object.entries(employementTypes).map(([type, checked]) => (
              <label key={type} className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleEmployementTypeChange(type)}
                />
                <span className="checkmark"></span>
                {type.replace(/([A-Z])/g, " $1").trim()}{" "}
                {/* Formata os nomes */}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTitle;
