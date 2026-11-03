import { Link } from "react-router";
export default function NotFound() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>This address does not match a page in this portfolio.</p>
      <Link to="/">Return to Home</Link>
    </section>
  );
}
