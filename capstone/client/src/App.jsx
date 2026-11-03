import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext.js";
import Header from "./components/Header.jsx";
import PortfolioRoutes from "./components/PortfolioRoutes.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const theme = useContext(ThemeContext);
  let pageClass = "portfolio-app";
  if (theme.dark) {
    pageClass = "portfolio-app dark-mode";
  }
  return (
    <div className={pageClass}>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main">
        <PortfolioRoutes />
      </main>
      <Footer />
    </div>
  );
}