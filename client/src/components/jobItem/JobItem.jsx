import React from "react";
import UseJobContext from "../../context/UseJobContext";
import { formatDates } from "../../../utils/formatDates";
import "./jobItem.css";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { deleteJob } = UseJobContext();

  console.log(job);

  return (
    <div className="card-jobItem">

      <img
        src={
          job?.createdBy?.profilePicture
            ? job.createdBy.profilePicture
            : "/profile-user.png"
        }
        alt="iconUser"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
      <h3
        onClick={() => navigate(`/jobs/${job._id}`)}
        className="container-jobCardItem"
      >
        {job.title}
      </h3>
      <p>Criado Por: {job.createdBy.name}</p>
      <p>{job.location}</p>
      <p>Postado {formatDates(job.createdAt)}</p>
      <div className="requeriments-skills">
        Requisitos:
        {job.skills.map((skill, index) => (
          <p key={index}>{skill}</p>
        ))}
      </div>

      <div className="requeriments-skills">
        Tags:
        {job.tags.map((tags, index) => (
          <p key={index}>{tags}</p>
        ))}
      </div>

      <div className="container-iconEdit">
        <img
          onClick={() => navigate(`/edit-job/${job._id}`)}
          style={{ maxWidth: "20px" }}
          src="/edit.png"
          alt="icon-edit"
        />
        <img
          onClick={() => deleteJob(job._id)}
          style={{ maxWidth: "20px" }}
          src="/trash-bin.png"
          alt="icon-lixeira"
        />
      </div>
    </div>
  );
};

const Badge = ({ children, variant = "primary" }) => {
  return <span className={`badge ${variant}`}>{children}</span>;
};

const JobItem = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/*onClick={() => navigate(`/jobs/${job._id}`)} className="container-jobCardItem"> */}

      <JobCard job={job} />
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default JobItem;
