import React, { useState } from "react";
import useGlobalContext from "../../context/UseContext";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./JobDetails.css";
function MyEditor() {
  const { setJobDescription, jobDescription } = useGlobalContext()



  return (
    <ReactQuill
      value={jobDescription}
      onChange={setJobDescription}
      style={{ minHeight: "400px", maxHeight: "900px" }}
      modules={{ toolbar: true }}
      className="custom-quill-editor"
    />
  );
}

const JobDetails = () => {
  const {
    handleSalaryChange,
    salary,
    salaryType,
    setSalaryType,
    setNegotiable,
    negotiable,
    setHideSalary,
    hideSalary,
  } = useGlobalContext();

  return (
    <div className="container-allJobDetails">
      <div className="container-descriptionJob">
        <div>
          <h3>Descrição da vaga</h3>
          <label>Forneça detalhes da vaga</label>
        </div>

        <div className="container-MyEditor">
          <MyEditor />
        </div>
      </div>

      <div className="container-salaryJob">
        <div>
          <h3>Salario:</h3>
          <label htmlFor="salary">Estabeleça um salario pra essa vaga</label>
        </div>

        <div className="container-inputsSalary">
          <input
            type="number"
            id="salary"
            placeholder="Forneça um salario"
            value={salary}
            onChange={handleSalaryChange}
          />

          <div className="container-payments">
            <div className="container-inputsPayments">
              <input
                type="checkbox"
                id="negotiable"
                checked={negotiable}
                onChange={(e) => setNegotiable(e.target.checked)}
              />
              <label htmlFor="negotiable">Negociavel</label>
            </div>

            <div className="container-inputsPayments">
              <input
                type="checkbox"
                id="hideSalary"
                checked={hideSalary}
                onChange={(e) => setHideSalary(e.target.checked)}
              />
              <label htmlFor="hideSalary">esconder salário</label>
            </div>

            <div className="container-modelPayments">
              <p>Modelo de pagamento</p>
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="" disabled>
                  Escolha uma opção
                </option>
                <option value="Por Hora">Por Hora</option>
                <option value="Por Mês">Por Mês</option>
                <option value="Por Ano">Por Ano</option>
                <option value="Fixo">Fixo</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
