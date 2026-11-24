import { useState } from "react";
import "../styles/home.css";

const Home = () => {
  const [selfDescription, setSelfDescription] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  return (
    <form
      id="main"
      onSubmit={({ preventDefault }) => {
        preventDefault();
      }}
    >
      <label id="upload-btn" htmlFor="resume">
        Upload Resume
        <input type="file" hidden name="resume" id="resume" accept=".pdf" />
      </label>
      <div id="left">
        <label id="label" htmlFor="jobDescription">
          Job Description
        </label>
        <textarea
          onChange={({ target }) => {
            setJobDescription(target.value);
          }}
          value={jobDescription}
          rows={8}
          cols={46}
          required
          minLength={20}
          name="jobDescription"
          id="jobDescription"
          placeholder="Enter job description here..."
        ></textarea>
      </div>

      <div id="right">
        <label id="label" htmlFor="selfDescription">
          Self Description
        </label>
        <textarea
          onChange={({ target }) => {
            setSelfDescription(target.value);
          }}
          value={selfDescription}
          rows={8}
          cols={46}
          required
          minLength={20}
          name="selfDescription"
          id="selfDescription"
          placeholder="Describe yourself in a few sentences..."
        ></textarea>
      </div>

      <button type="submit" id="generate-btn" className="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 3H8" />
          <path d="m15.007 5.008 3.987 3.986" />
          <path d="M20 15v4" />
          <path d="M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="M22 17h-4" />
          <path d="M4 5v4" />
          <path d="M6 7H2" />
          <path d="M9 2v2" />
        </svg>
        Generate Interview Report
      </button>
    </form>
  );
};

export default Home;
