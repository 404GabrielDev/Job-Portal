import React, { useCallback, useEffect, useId, useState } from "react";
import ReactQuill from "react-quill-new";
import UseGlobalContext from "../../context/UseContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UseJobContext from "../../context/UseJobContext";
import { toast } from "react-hot-toast";

/*LÓGICA DO JOB DETAILS*/
function MyEditor({ value, onChange }) {
  return (
    <>
      <ReactQuill
        key="editor"
        value={value}
        onChange={onChange}
        style={{ minHeight: "400px", maxHeight: "900px" }}
        modules={{ toolbar: true }}
        className="custom-quill-editor"
      />
    </>
  );
}
/*---------------------------*/

const EditJob = () => {
  const navigate = useNavigate();
  const { setActiveEmployementTypes } = UseGlobalContext();

  const { jobs } = UseJobContext();

  const { id } = useParams();

  const job = jobs.find((jobs) => jobs._id === id);

  console.log("Detalhe do job aqui", job);

  const [jobTitle, setJobTitle] = useState(job?.title || "");
  const [jobDescription, setJobDescription] = useState(job?.description || "");
  const [salary, setSalary] = useState(job?.salary || "");
  const [salaryType, setSalaryType] = useState(job?.salaryType || "");
  const [negotiable, setNegotiable] = useState(job?.negotiable || false);
  const [hideSalary, setHideSalary] = useState(false);
  const [tags, setTags] = useState(job?.tags || []);
  const [skills, setSkills] = useState(job?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [newTag, setNewTag] = useState("");
  const [location, setLocation] = useState({
    country: "",
    city: "",
    address: "",
  });
  const [employementTypes, setEmployementTypes] = useState({
    "Full Time": job?.jobType?.includes("Full Time"),
    "Part Time": job?.jobType?.includes("Part Time"),
    Contract: job?.jobType?.includes("Contract"),
    Internship: job?.jobType?.includes("Internship"),
    Temporary: job?.jobType?.includes("Temporary"),
  });

  useEffect(() => {
    if (job) {
      setJobTitle(job.title || "");
      setJobDescription(job.description || "");
      setSalary(job.salary || "");
      setSalaryType(job.salaryType || "");
      setNegotiable(job.negotiable || false);
      setTags(job.tags || []);
      setSkills(job.skills || []);
      const [city, state, country] = job.location.split(", ");
      setLocation({
        country: country || "",
        city: city || "",
        address: state || "",
      });
    }
  }, [job]);

  const handleChange = useCallback((content) => {
    setJobDescription(content);
  }, []);

  const handleEmployementTypeChange = useCallback((type) => {
    setEmployementTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  }, []);

  /*LÓGICA DO JOB TITLE*/

  useEffect(() => {
    const selectedTypes = Object.entries(employementTypes)
      .filter(([_, isChecked]) => isChecked)
      .map(([type]) => type);

    setActiveEmployementTypes(selectedTypes);
  }, [employementTypes]);

  /*---------------------------*/

  /*LÓGICA DA LOCATION*/
  const handleLocationChange = (e) => {
    const { name, value } = e.target;

    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  /*---------------------------*/

  /*LÓGICA DAS SKILLS E TAGS*/

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  /*---------------------------*/

  /*ENVIANDO DADOS VIA AXIOS*/
  const handleUpdateJob = async () => {
    try {
      // Converte employementTypes em um array de strings
      const selectedJobTypes = Object.entries(employementTypes)
        .filter(([_, isChecked]) => isChecked)
        .map(([type]) => type);

      // Combina as partes do location em uma única string
      const fullLocation = `${location.city}, ${location.address}, ${location.country}`;

      const updatedJob = {
        title: jobTitle,
        description: jobDescription,
        location:fullLocation,
        salary,
        jobType: selectedJobTypes, // Usa os tipos de emprego selecionados
        tags,
        skills,
        salaryType,
        negotiable,
      };

      const response = await axios.put(
        `http://localhost:8000/api/v1/jobs/${id}`,
        updatedJob,
        { withCredentials: true }
      );

      toast.success("Vaga atualizada com sucesso!");
      navigate("/"); // Redireciona para o painel de controle
    } catch (error) {
      toast.error("Erro ao atualizar a vaga!");
      console.error("Erro na atualização:", error);
    }
  };

  /*---------------------------*/

  return (
    <>
      {/*CONTAINER DO TITULO*/}
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

        <hr />
      </div>

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

      {/*CONTAINER DA DESCRIÇÃO*/}
      <div className="container-MyEditor">
        <MyEditor value={jobDescription} onChange={handleChange} />
      </div>

      {/*CONTAINER DO SALARIO*/}
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
            onChange={(e) => setSalary(e.target.value)}
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

      {/*CONTAINER DAS SKILLS E TAGS*/}
      <div className="container-allTagsSkills">
        <div className="container-allTagsSkills1">
          <div>
            <div className="container-Allskills1">
              <div className="container-skills1">
                <div>
                  <h3>Skills</h3>
                  <label htmlFor="skills">
                    Adicione habilidades relevantes para as vagas
                  </label>
                </div>

                <div className="containerAdd-skill">
                  <input
                    type="text"
                    id="skills"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Habilidades"
                  />

                  <button type="button" onClick={handleAddSkill}>
                    Adicionar Habilidade
                  </button>
                </div>
              </div>
              <div>
                {skills.map((skill, index) => (
                  <div className="addSkillTag" key={index}>
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <img
                        id="iconImgClose"
                        style={{ maxWidth: "10px" }}
                        src="/iconX.png"
                        alt="icon x"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="container-allSectionTag">
            <div className="container-sectionTag">
              <div>
                <h3>Tags</h3>
                <label htmlFor="tags">
                  Adicione tags de categorias que ajudam a filtrar e encontrar a
                  vaga
                </label>
              </div>

              <div className="containerAdd-skill">
                <input
                  type="text"
                  id="skillsTag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Habilidades"
                />

                <button type="button" onClick={handleAddTag}>
                  Adicionar Habilidade
                </button>
              </div>
            </div>
            <div>
              {tags.map((tag, index) => (
                <div className="addSkillTag" key={index}>
                  <span>{tag}</span>
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                    <img
                      id="iconImgClose"
                      style={{ maxWidth: "10px", cursor: "pointer" }}
                      src="/iconX.png"
                      alt="icon x"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*CONTAINER LOCATION*/}
      <div className="container-allLocation">
        <h3>Job Location</h3>
        <div className="container-countryCity">
          <div className="input-CountryCity">
            <label htmlFor="country">País</label>
            <input
              type="text"
              id="country"
              name="country"
              value={location.country}
              onChange={handleLocationChange}
              placeholder="insira a localidade do País"
            />
          </div>

          <div className="input-CountryCity">
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              id="city"
              name="city"
              value={location.city}
              onChange={handleLocationChange}
              placeholder="insira uma cidade"
            />
          </div>
        </div>

        <div>
          <div className="input-address">
            <label htmlFor="country">Endereço</label>
            <input
              type="text"
              id="address"
              name="address"
              value={location.address}
              onChange={handleLocationChange}
              placeholder="insira um endereço"
            />
          </div>
        </div>
      </div>

      <button onClick={handleUpdateJob} className="btn-save">
        Atualizar Vaga
      </button>
    </>
  );
};

export default EditJob;
