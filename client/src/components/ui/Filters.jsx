import React from "react";
import "./Filters.css";
import UseJobContext from "../../context/UseJobContext";
import SalarySlider from "../SalarySlider/SalarySlider";
import FormatMoney from '../../../utils/FormatMoney'
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
      fullStack: false,
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
              clearAllFilters();
              searchJobs();
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
      </div>

      <div className="container-partCheckbox">
        <h2>Skills</h2>
        <div className="container-partCheckbox">
          <div>
            <input
              type="checkbox"
              id="fullStack"
              checked={filters.fullStack}
              onChange={() => handleFilterChange("fullStack")}
            />
            <label htmlFor="fullStack">Full Stack</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="backEnd"
              checked={filters.backEnd}
              onChange={() => handleFilterChange("backEnd")}
            />
            <label htmlFor="backEnd">Backend</label>
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
              id="internship"
              checked={filters.uiux}
              onChange={() => handleFilterChange("uiux")}
            />
            <label htmlFor="uiux">uiux</label>
          </div>
        </div>
      </div>

      <div className="container-salaryRange">
        <h2>Faixa Salarial</h2>
        <SalarySlider id="minSalary" onChange={handleSalaryChange} />
      </div>
      <span>{FormatMoney(minSalary, "GBP")}</span>
      <span>{FormatMoney(maxSalary, "GBP")}</span>
    </div>
  );
};

export default Filters;
