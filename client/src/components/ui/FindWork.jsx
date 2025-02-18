import React from "react";
import UseJobContext from "../../context/UseJobContext";
import "./FindWork.css";

const FindWork = () => {
  const { searchJobs, handleSearchChange, searchQuery } = UseJobContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
      }}
    >
      <div className="containerAll-searchJob">
        <div className="container-searchJob">
          <span>
            <img
              src="/iconSearch.png"
              alt="icon-Search"
              style={{ maxWidth: "25px" }}
            />
          </span>
          <input
            type="text"
            id="job-title"
            name="title"
            value={searchQuery.title}
            onChange={(e) => handleSearchChange("title", e.target.value)}
            placeholder="Nome da vaga ou palavras chaves"
          />

          <p></p>

          <div className="container-searchJob">
            <span><img style={{maxWidth:"30px"}} src="/map.png" alt="input-location" /></span>
            <input
              type="text"
              id="location"
              name="location"
              value={searchQuery.location}
              onChange={(e) => handleSearchChange("location", e.target.value)}
              placeholder="Insira um Local"
            />
          </div>

            <button type="submit">
                Search
            </button>

        </div>
      </div>
    </form>
  );
};

export default FindWork;
