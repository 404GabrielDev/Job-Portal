import React, { useState } from "react";
import "./SalarySlider.css";
import ReactSlider from "react-slider";
import UseJobContext from "../../context/UseJobContext";

const SalarySlider = ({ min = 0, max = 100000, onChange }) => {
  const [salarySlider, setSalarySlider] = useState([min, max]);
  const { minSalary, maxSalary } = UseJobContext();
  const [salaryRange, setSalaryRange] = useState([minSalary, maxSalary]);
  
  
  const handleChange = (value) => {
    setSalaryRange(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="slider-container">
      <h3>faixa salarial</h3>

      <p>
        R$ {salarySlider[0]} - R$ {salarySlider[1]}
      </p>
      <hr />

      <p>Minimo/Maximo</p>
      <ReactSlider
        className="custom-slider"
        thumbClassName="custom-thumb"
        trackClassName="custom-track"
        min={min}
        max={max}
        value={salaryRange}
        onChange={handleChange}
        minDistance={500} // Define uma distância mínima entre os valores
        pearling
      />
    </div>
  );
};

export default SalarySlider;
