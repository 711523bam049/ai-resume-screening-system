import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [jobSkills, setJobSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const skillsArray = jobSkills.split(",").map((s) => s.trim());

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "job_skills",
      new Blob([JSON.stringify(skillsArray)], {
        type: "application/json",
      })
    );

    try {
      const res = await fetch("http://127.0.0.1:8000/match-resume/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          AI Resume Screening System
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Job Skills (comma separated)
            </label>
            <input
              type="text"
              placeholder="Python, FastAPI, SQL, Docker"
              value={jobSkills}
              onChange={(e) => setJobSkills(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>

        {result && (
          <div className="mt-6 border rounded-lg p-4 bg-slate-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Result
            </h3>
            <p className="text-sm">
              <b>Email:</b> {result.email}
            </p>
            <p className="text-sm">
              <b>Skills:</b> {result.resume_skills.join(", ")}
            </p>
            <p className="text-sm mt-1">
              <b>Resume Score:</b>{" "}
              <span className="text-blue-600 font-semibold">
                {result.resume_score}%
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;