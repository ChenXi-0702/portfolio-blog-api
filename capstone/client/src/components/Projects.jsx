import { useEffect, useState } from "react";
import { getProjects } from "../api.js";
import ProjectResults from "../components/ProjectResults.jsx";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  function retry() {
    setAttempt(attempt + 1);
  }
  useEffect(
    function () {
      let active = true;
      setStatus("loading");
      setProjects([]);
      getProjects()
        .then(function (data) {
          if (active) {
            setProjects(data);
            setStatus("success");
          }
        })
        .catch(function () {
          if (active) {
            setStatus("error");
          }
        });
      return function () {
        active = false;
      };
    },
    [attempt]
  );
  return (
    <section id="projects">
      <h2>Projects</h2>
      <ProjectResults status={status} projects={projects} onRetry={retry} />
    </section>
  );
}
