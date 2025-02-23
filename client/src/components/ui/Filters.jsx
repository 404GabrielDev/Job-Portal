import React from "react";
import "./Filters.css";
import UseJobContext from "../../context/UseJobContext";
import SalarySlider from "../SalarySlider/SalarySlider";
import FormatMoney from "../../../utils/FormatMoney";
const Filters = () => {
  const { searchJobs } = UseJobContext();

  const {
    handleFilterChange,
    filters,
    setFilters,
    minSalary,
    maxSalary,
    setMinSalary,
    setMaxSalary,
    setSearchQuery,
  } = UseJobContext();

  const clearAllFilters = () => {
    setFilters({
      fulltime: false,
      partTime: false,
      contract: false,
      internship: false,
      fullstack: false,
      devOps: false,
      backEnd: false,
      uiux: false,
    });

    setSearchQuery({ tags: "", location: "", title: "" });
  };

  //ultilizar isso com o slider

  const handleSalaryChange = (value) => {
    setMinSalary(value[0]);
    setMaxSalary(value[1]);
  };

  return (
    <div className="container-partCheckbox">
      <div className="container-partCheckbox">
        <div className="containerClear">
          <h2>Job Type</h2>

          <button
            onClick={() => {
              searchJobs();
              clearAllFilters();
            }}
          >
            Clear All
          </button>
        </div>

        <div>
          <input
            type="checkbox"
            id="fulltime"
            checked={filters.fulltime}
            onChange={() => handleFilterChange("fulltime")}
          />
          <label htmlFor="fulltime">Full time</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="partTime"
            checked={filters.partTime}
            onChange={() => handleFilterChange("partTime")}
          />
          <label htmlFor="partTime">Part Time</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="contract"
            checked={filters.contract}
            onChange={() => handleFilterChange("contract")}
          />
          <label htmlFor="contract">Contract</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="internship"
            checked={filters.internship}
            onChange={() => handleFilterChange("internship")}
          />
          <label htmlFor="internship">Internship</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="Temporary"
            checked={filters.temporary}
            onChange={() => handleFilterChange("temporary")}
          />
          <label htmlFor="Temporary">Temporary</label>
        </div>
      </div>

      <div className="container-partCheckbox">
        <h2>Skills</h2>
        <div className="container-partCheckbox">
          <div>
            <input
              type="checkbox"
              id="fullstack"
              checked={filters.fullstack}
              onChange={() => handleFilterChange("fullstack")}
            />
            <label htmlFor="fullstack">Full Stack</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="backend"
              checked={filters.backend}
              onChange={() => handleFilterChange("backend")}
            />
            <label htmlFor="backend">Backend</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="devOps"
              checked={filters.devOps}
              onChange={() => handleFilterChange("devOps")}
            />
            <label htmlFor="devOps">devOps</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="uiux"
              checked={filters.uiux}
              onChange={() => handleFilterChange("uiux")}
            />
            <label htmlFor="uiux">uiux</label>
          </div>
        </div>
      </div>

      {/* 
      <span>{FormatMoney(minSalary, "GBP")}</span>
      <span>{FormatMoney(maxSalary, "GBP")}</span> */}
    </div>
  );
};

export default Filters;
