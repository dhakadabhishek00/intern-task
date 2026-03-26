import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [teachers, setTeachers] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [teacherForm, setTeacherForm] = useState({ university_name: "", gender: "", year_joined: "" });
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const fetchTeachers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/teachers", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setTeachers(res.data);
    } catch (err) {
      setError("Failed to load teachers. Please login and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filtered = teachers.filter((t) => {
    const combined = `${t.first_name} ${t.last_name} ${t.university_name}`.toLowerCase();
    return combined.includes(query.trim().toLowerCase());
  });

  const addTeacher = async () => {
    if (!teacherForm.university_name || !teacherForm.gender || !teacherForm.year_joined) {
      setError("All teacher fields are required.");
      return;
    }

    setAdding(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:5000/api/teachers",
        teacherForm,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setTeacherForm({ university_name: "", gender: "", year_joined: "" });
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data || "Failed to add teacher.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Teachers Dashboard</h2>
        <div>
          <button className="secondary-btn" onClick={fetchTeachers} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button className="danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <input
        className="search-input"
        placeholder="Search teachers by name or university..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="auth-card" style={{ marginBottom: "1rem" }}>
        <h3>Add Teacher</h3>
        <label>University</label>
        <input
          value={teacherForm.university_name}
          onChange={(e) => setTeacherForm({ ...teacherForm, university_name: e.target.value })}
          placeholder="University name"
        />
        <label>Gender</label>
        <input
          value={teacherForm.gender}
          onChange={(e) => setTeacherForm({ ...teacherForm, gender: e.target.value })}
          placeholder="Gender"
        />
        <label>Year Joined</label>
        <input
          type="number"
          value={teacherForm.year_joined}
          onChange={(e) => setTeacherForm({ ...teacherForm, year_joined: e.target.value })}
          placeholder="Year joined"
        />
        <button onClick={addTeacher} disabled={adding}>
          {adding ? "Adding..." : "Add Teacher"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {filtered.length === 0 && !loading ? (
        <p className="empty-text">No teachers found. Try another query or refresh.</p>
      ) : (
        <div className="teacher-list">
          {filtered.map((t, index) => (
            <div key={t.id || index} className="teacher-card">
              <h3>{t.first_name} {t.last_name}</h3>
              <p>University: {t.university_name || "N/A"}</p>
              <p>Email: {t.email || "Not provided"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}