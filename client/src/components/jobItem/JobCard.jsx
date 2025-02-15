import React, { useEffect, useState } from "react";
import UseJobContext from "../../context/UseJobContext";
import UseGlobalContext from "../../context/UseContext";
import { useNavigate } from "react-router-dom";
import formatMoney from "../../../utils/FormatMoney";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { formatDates } from "../../../utils/formatDates";
import "./jobCard.css";

const JobCard = ({ job, activeJob }) => {
  const { likeJob } = UseJobContext();
  const { userProfile, globalisAuthenticated } = UseGlobalContext();
  const [isLiked, setIsLiked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const navigate = useNavigate();

  const handleLike = (id) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  const { createdBy } = job;
  const name = createdBy ? createdBy.name : "Nome não disponível";

  const {
    profilePicture,
    //name,
    title,
    location,
    salary,
    salaryType,
    createdAt,
    applicants,
    jobType,
  } = job;

  //`${name} está contratando para ${title} em ${location}`

  useEffect(() => {
    setIsLiked(job.likes.includes(userProfile._id));
  }, [job.likes, userProfile._id]);

  const companyDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed Ut purus eget nun";

  const cardBorderColor = activeJob ? "#6a0dad" : "#fff";

  const jobTypeBg = (type) => {
    switch (type.toLowerCase()) {
      case "full time":
        return "full-time";
      case "part time":
        return "part-time";
      case "contract":
        return "contract";
      case "internship":
        return "internship";
      default:
        return "default";
    }
  };

  return (
    <div className={`job-card ${activeJob ? "active" : ""}`}>
      <div>
        <div /*onClick={() => navigate(`/job/${job._id}`)}*/>
          <div className="container-cardDetails1">
            <img
              src={profilePicture || "/profile-user.png"}
              alt={name || "User"}
              width={40}
              height={40}
            />

            <h4>{title}</h4>
          </div>

          <div className="container-cardDetails2">
            <p>
              {name} {applicants.length}{" "}
              {applicants.length > 1 ? "Applicants" : "Applicant"}
            </p>

            <button
              onClick={() => {
                globalisAuthenticated
                  ? handleLike(job._id)
                  : navigate("/http://localhost:8000/login");
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
        </div>
      </div>
      <div>
        {jobType.map((type, index) => (
          <span key={index} className={jobTypeBg(type)}>
            {type}
          </span>
        ))}
      </div>

      <p>
        {companyDescription.length > 100
          ? `${companyDescription.substring(0, 100)}...`
          : companyDescription}
      </p>

      <hr />

      <div>
        <p>
          <span>{formatMoney(salary, "GBP")}</span>
          <span>
            {salaryType === "Yearly"
              ? "pa"
              : salaryType === "Monthly"
              ? "pcm"
              : salaryType === "Weekly"
              ? "pw"
              : "ph"}
          </span>
        </p>

        <p>
          {showCalendar && (
            <div>
              <p>Postado: {formatDates(createdAt)}</p>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
