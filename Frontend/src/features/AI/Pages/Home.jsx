import "../styles/home.css";

const Home = () => {
  return (
    <main className="min-h-full w-full flex justify-center items-center gap-2">
      <div className="left">
        <textarea
          rows={25}
          cols={45}
          required
          minLength={20}
          name="jobDescription"
          id="jobDescription"
          placeholder="Enter job description here..."
        ></textarea>
      </div>

      <div className="right">
        <div className="input-group">
          <label
            className="border rounded-full text-center inline-block pl-2"
            htmlFor="resume"
          >
            Upload Resume
            <input type="file" hidden name="resume" id="resume" accept=".pdf" />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="selfDescription">Self Description</label>
          <textarea
            name="selfDescription"
            id="selfDescription"
            placeholder="Describe yourself in a few sentences..."
          ></textarea>
        </div>

        <button className="generate-btn">Generate Interview Report</button>
      </div>
    </main>
  );
};

export default Home;
