import { useParams } from "react-router-dom";
import UseJobContext from "../../../context/UseJobContext";
import JobCard from "../../jobItem/JobCard";
import "./Page.css";
import React, { useEffect, useState } from "react";
import UseGlobalContext from "../../../context/UseContext";
import formatMoney from "../../../../utils/FormatMoney";
import { formatDate } from "react-calendar/dist/esm/shared/dateFormatter.js";
import { formatDates } from "../../../../utils/formatDates";

const Page = () => {
  const { jobs, likeJob, applyJob } = UseJobContext();
  const { userProfile } = UseGlobalContext();
  const params = useParams();
  const { id } = params;

  const [isLiked, setIsLiked] = useState(false);
  const [isApplied, setIsApplied] = useState(false)


  const job = jobs.find((job) => job._id === id);
  const otherJobs = jobs.filter((job) => job._id !== id);

  useEffect(() => {
    if (job) {
      setIsLiked(job.likes.includes(userProfile._id));
    }
  }, [job, userProfile._id]);

  if (!job) return null;

  const {
    title,
    location,
    description,
    salary,
    createdBy,
    jobType,
    createdAt,
    salaryType,
    negotiable,
    applicants,
  } = job;

  const { name, profilePicture } = createdBy;

  const handleLike = (id) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };



  return (
    <div>
      <div className="container-allDescription">
        <div>
          <JobCard activeJob job={job} />
          {otherJobs.map((job) => (
            <JobCard job={job} key={job._id} />
          ))}
        </div>

        <div className="container-alldescriptionJob">
          <div className="container-descriptionJobClick">
            <div className="container-profile-save">
              <div className="container-descriptionJob-s1">
                <img
                  src={profilePicture || "./profile-user.png"}
                  width={50}
                  height={50}
                />

                <div>
                  <p className="name-profile">{name}</p>
                  <p>Recruiter</p>
                </div>
              </div>
            </div>
            <div
              className={isLiked ? "btn-liked" : "btn-not-liked"}
              onClick={() => handleLike(job._id)}
            >
              {isLiked ? (
                <>
                  <img style={{ width: "25px" }} src="/iconSave.png" />
                </>
              ) : (
                <>
                  <img style={{ width: "25px" }} src="/iconSave.png" />
                </>
              )}
            </div>
          </div>

          <div className="descriptionDetail-Job">
            <h1>{title}</h1>
            <div>
              <p>{location}</p>
            </div>
          </div>

          <div className="container-cardFilds-information">
            <p className="cardFilds-information">
              <span>Salary</span>
              <span>
                <span>{formatMoney(salary, "GBP")}</span>
                <span>
                  /
                  {salaryType
                    ? `${
                        salaryType === "Yearly"
                          ? "pa"
                          : salaryType === "Monthly"
                          ? "pcm"
                          : salaryType === "Weekly"
                          ? "pw"
                          : "ph"
                      }`
                    : ""}
                </span>
              </span>
            </p>

            <p className="cardFilds-information2">
              <span>Posted</span>
              <span>{formatDates(createdAt)}</span>
            </p>

            <p className="cardFilds-information3">
              <span>Applicants</span>
              <span>{applicants.length}</span>
            </p>

            <p className="cardFilds-information4">
              <span>Job Type</span>
              <span>{jobType[0]}</span>
            </p>
          </div>
          <h2>Job Description</h2>

          <div className="wysiwy" id="htmlDescription" dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>

        <div className="container-ApplyDetails-job">
          <button className={`${isApplied ? "aplicado" : "aplicar"}`}>
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Page;
