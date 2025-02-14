import React, { useState } from "react";
import UseJobContext from "../../context/UseJobContext";
import UseGlobalContext from "../../context/UseContext";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, activeJob }) => {
  const { likeJob } = UseJobContext();
  const { userProfile, globalisAuthenticated } = UseGlobalContext();
  const [isLiked, setIsLiked] = useState(false);

  const {
    title,
    location,
    salaryType,
    salary,
    createdBy,
    applicants,
    jobType,
    createdAt,
  } = job;

  const { name, profilePicture } = createdBy;

  const navigate = useNavigate();

  const handleLike = (id) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  //`${name} está contratando para ${title} em ${location}`

  const companyDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Ut purus eget nun";

  const jobTypeBg = (type) => {
    switch (type) {
      case "full Time":
        return "blue";

      case "part time":
        return "green";

      case "Contract":
        return "black";

      case "internship":
        return "orange";

      default:
        return "orange";
    }
  };

  return (
    <div className={`${activeJob ? "borda roxa" : "borda branca"}`}>
      <div>
        <div onClick={() => navigate(`/job/${job._id}`)}>
          <div>
            <img
              src={profilePicture || "/profile-user.png"}
              alt={name}
              width={40}
              height={40}
            />
          </div>

          <div>
            <h4>{title}</h4>
            <p>
              {name}:{applicants.length}{" "}
              {applicants.length > 1 ? "Applicants" : "Applicant"}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            globalisAuthenticated ? handleLike(job._id) : navigate("/http://localhost:8000/login");
          }}
          style={{ color: isLiked ? "#000" : "#fff" }}
        >
          {isLiked ? (
            <img style={{ maxWidth: "20px" }} src="./iconSave.png" />
          ) : (
            <img style={{ maxWidth: "20px" }} src="/iconSave.png" />
          )}
        </button>
      </div>
      <div>
        {jobType.map((type, index) => (
            <span key={index} className={`${jobTypeBg(type)}`}>Type</span>
        ))}
      </div>

      <p>
        {companyDescription.length > 100 ? `${companyDescription.substring(0, 100)}...` : companyDescription}
      </p>
    </div>
  );
};

export default JobCard;
