import { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks").replace(/\/tasks$/, "");

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Your account email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-success">{message}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <p className="auth-switch">
        <Link to="/login" className="link-btn">Back to Log In</Link>
      </p>
    </div>
  );
}