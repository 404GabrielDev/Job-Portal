import React, { useState } from "react";
import useGlobalContext from "../../context/UseContext";
import "./JobSkills.css";

const JobSkills = () => {
  const { skills, setSkills, tags, setTags } = useGlobalContext();

  const [newSkill, setNewSkill] = useState("");
  const [newTag, setNewTag] = useState("");

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

  return (
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
                      src="./iconX.png"
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
                Adicione tags de categorias que ajudam a filtrar e encontrar a vaga
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
                Adicionar Tags
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
                    src="./iconX.png"
                    alt="icon x"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSkills;
