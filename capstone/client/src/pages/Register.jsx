import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await auth.register(username.trim(), email.trim(), password);
      navigate("/admin");
    } catch (problem) {
      setError(problem.message);
    }
    setBusy(false);
  }

  return (
    <section id="register">
      <h2>Register</h2>
      {error ? <p role="alert" className="form-feedback">{error}</p> : null}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username" required minLength={3} maxLength={30}
          autoComplete="username" value={username}
          onChange={function (event) { setUsername(event.target.value); }}
        />
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email" type="email" required maxLength={254}
          autoComplete="email" value={email}
          onChange={function (event) { setEmail(event.target.value); }}
        />
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password" type="password" required minLength={6}
          autoComplete="new-password" value={password}
          onChange={function (event) { setPassword(event.target.value); }}
        />
        <button type="submit" disabled={busy}>
          {busy ? "Creating account..." : "Register"}
        </button>
      </form>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </section>
  );
}
