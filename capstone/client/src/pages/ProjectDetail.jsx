import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProject } from "../api.js";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.projectId;
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  function retry() {
    setAttempt(attempt + 1);
  }
  useEffect(
    function () {
      let active = true;
      setStatus("loading");
      setProject(null);
      getProject(projectId)
        .then(function (data) {
          if (active) {
            setProject(data);
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
    [projectId, attempt]
  );
  if (status === "loading") {
    return <p role="status">Loading project...</p>;
  }
  if (status === "error") {
    return (
      <section role="alert">
        <h2>Project unavailable</h2>
        <p>Check the ID or connection, or try again later.</p>
        <button type="button" onClick={retry}>
          Retry
        </button>
        <p>
          <Link to="/projects">Return to Projects</Link>
        </p>
      </section>
    );
  }
  let image = "/assets/project.jpg";
  if (project.imageUrl) {
    image = project.imageUrl;
  }
  return (
    <section>
      <h2>{project.title}</h2>
      <img
        className="mb-4 h-auto w-full max-w-xl"
        src={image}
        alt={project.title}
        width="640"
        height="360"
      />
      <p>{project.description ? project.description : "No description provided."}</p>
      {project.liveUrl ? (
        <p><a href={project.liveUrl}>View live site</a></p>
      ) : null}
      {project.repoUrl ? (
        <p><a href={project.repoUrl}>View repository</a></p>
      ) : null}
      <p>
        <Link to="/projects">Return to Projects</Link>
      </p>
    </section>
  );
}
