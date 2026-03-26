import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ email: "", first_name: "", last_name: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!data.email || !data.first_name || !data.last_name || !data.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>First Name</label>
        <input
          type="text"
          placeholder="First name"
          value={data.first_name}
          onChange={(e) => setData({ ...data, first_name: e.target.value })}
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last name"
          value={data.last_name}
          onChange={(e) => setData({ ...data, last_name: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Choose a password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="error-text">{error}</p>}

        <p className="small-note">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}