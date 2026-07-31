import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks").replace(/\/tasks$/, "");

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="auth-card">
        <h2>Password Reset</h2>
        <p className="auth-success">Your password has been reset. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h2>Set a New Password</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="password" placeholder="New password (min 6 characters)" minLength={6}
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm new password" minLength={6}
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      <p className="auth-switch">
        <Link to="/login" className="link-btn">Back to Log In</Link>
      </p>
    </div>
  );
}