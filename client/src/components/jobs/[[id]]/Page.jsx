import { useNavigate, useParams } from "react-router-dom";
import UseJobContext from "../../../context/UseJobContext";
import JobCard from "../../jobItem/JobCard";
import "./Page.css";
import React, { useEffect, useState } from "react";
import UseGlobalContext from "../../../context/UseContext";
import formatMoney from "../../../../utils/FormatMoney";
import { formatDate } from "react-calendar/dist/esm/shared/dateFormatter.js";
import { formatDates } from "../../../../utils/formatDates";
import { toast } from "react-hot-toast";
const Page = () => {
  const { jobs, likeJob, applyToJob } = UseJobContext();
  const { userProfile, globalisAuthenticated } = UseGlobalContext();
  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const job = jobs.find((job) => job._id === id);
  const otherJobs = jobs.filter((job) => job._id !== id);

  useEffect(() => {
    if (job) {
      setIsApplied(job.applicants.includes(userProfile._id));
    }
  }, [job]);

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

  const isLikes = job.likes.includes(userProfile?._id);
  //const isApplied = applicants.includes(userProfile?._Id)

  const { name, profilePicture } = createdBy;

  const handleLike = (id) => {
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
                  alt="Foto-de-perfil"
                />

                <div>
                  <p className="name-profile">{name}</p>
                  <p>Recruiter</p>
                </div>
              </div>
            </div>
            <div
              className={isLiked ? "btn-liked" : "btn-not-liked"}
              onClick={() => {
                globalisAuthenticated ? handleLike(job._id)
                : navigate('http://localhost:8000/login')
              }}
            >
              {isLiked ? (
                <>
                  <img style={{ width: "25px" }} src="/bookmark.png" alt="BookMark" />
                </>
              ) : (
                <>
                  <img style={{ width: "25px" }} src="/iconSave.png" alt="BookMark" />
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

          <div
            className="wysiwy"
            id="htmlDescription"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>

        <div className="container-ApplyDetails-job">
          <div className="container-btn-applyJob">
            <button
              className={`${isApplied ? "aplicado" : "aplicar"}`}
              onClick={() => {
                if (globalisAuthenticated) {
                  if (!isApplied) {
                    applyToJob(job._id);
                    setIsApplied(true);
                  } else {
                    toast.error("Você já se candidatou pra essa vaga");
                  }
                } else {
                  navigate("http://localhost:8000/login");
                }
              }}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </button>
          </div>

          <div className="container-otherInformation">
            <h3>Other Information</h3>

            <div>
              <p>
                <span>Posted:</span>
                {formatDates(createdAt)}
              </p>
            </div>

            <p>
              <span>Salary negotiable: </span>
              <span
                className={`${
                  negotiable ? "negotiableGreen" : "negotiableRed"
                }`}
              >
                {negotiable ? "Yes" : "No"}
              </span>
            </p>

            <p>
              <span>Location:</span> {location}
            </p>

            <p>
              <span>Job Type :</span> {jobType.join(" - ")}
            </p>
          </div>

          <div className="containerAll-elementSkills">
            <h3>Tags</h3>
            <p>Other Relevant tags for the job position</p>

            <div className="containerElementTags">
              {job.tags.map((tag, index) => (
                <span id="elementTags" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="containerAll-elementSkills">
            <h3>Skills</h3>
            <p>This is a full-time position. the successful candidate will be responsible for the following</p>

            <div className="containerElementSkills">
              {job.skills.map((tag, index) => (
                <span id="elementSkills" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;
