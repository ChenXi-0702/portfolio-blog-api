import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Header() {
  const auth = useAuth();
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-slate-800 p-4 text-white">
      <h1 id="main-heading" className="text-2xl font-bold">
        Chen Xi | Web portfolio
      </h1>
      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap gap-2">
          <li><Link className="text-white underline" to="/">Home</Link></li>
          <li><Link className="text-white underline" to="/projects">Projects</Link></li>
          <li><Link className="text-white underline" to="/blog">Blog</Link></li>
          <li><Link className="text-white underline" to="/contact">Contact</Link></li>
          {auth.isLoggedIn ? (
            <>
              <li><Link className="text-white underline" to="/admin">Admin</Link></li>
              <li className="px-3 py-2 text-sm">Signed in as {auth.user.username}</li>
              <li>
                <button type="button" onClick={auth.logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link className="text-white underline" to="/login">Login</Link></li>
              <li><Link className="text-white underline" to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}
