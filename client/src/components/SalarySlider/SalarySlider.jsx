import React, { useState } from "react";
import "./SalarySlider.css";
import ReactSlider from "react-slider";
import UseJobContext from "../../context/UseJobContext";

const SalarySlider = ({ min = 0, max = 100000, onChange, value }) => {
  /*const [salarySlider, setSalarySlider] = useState([min, max]);
  const { minSalary, maxSalary } = UseJobContext();
  const [salaryRange, setSalaryRange] = useState([minSalary, maxSalary]);*/

  const handleChange = (newValue) => {
    //setSalaryRange(value);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="slider-container">
      <h1>Faixa Salarial</h1>

      <p>Minimo/Maximo</p>

      <p>
        R$ {value[0]} - R$ {value[1]}
      </p>

      <ReactSlider
        className="custom-slider"
        thumbClassName="custom-thumb"
        trackClassName="custom-track"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        minDistance={500} // Define uma distância mínima entre os valores
        pearling
      />
    </div>
  );
};

export default SalarySlider;
