import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await auth.login(email.trim(), password);
      navigate("/admin");
    } catch (problem) {
      setError(problem.message);
    }
    setBusy(false);
  }

  return (
    <section id="login">
      <h2>Login</h2>
      {error ? <p role="alert" className="form-feedback">{error}</p> : null}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email" type="email" required maxLength={254}
          autoComplete="email" value={email}
          onChange={function (event) { setEmail(event.target.value); }}
        />
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password" type="password" required minLength={6}
          autoComplete="current-password" value={password}
          onChange={function (event) { setPassword(event.target.value); }}
        />
        <button type="submit" disabled={busy}>
          {busy ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>No account yet? <Link to="/register">Register</Link></p>
    </section>
  );
}
