import { Routes, Route } from "react-router";
import Home from "../pages/Home.jsx";
import Projects from "../components/Projects.jsx";
import ProjectDetail from "../pages/ProjectDetail.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import Blog from "../pages/Blog.jsx";
import BlogDetail from "../pages/BlogDetail.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Admin from "../pages/Admin.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

export default function PortfolioRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:postId" element={<BlogDetail />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
