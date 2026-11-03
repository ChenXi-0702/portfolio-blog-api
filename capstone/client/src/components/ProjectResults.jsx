import ProjectCard from "./ProjectCard.jsx";

export default function ProjectResults(props) {
  if (props.status === "loading") {
    return <p role="status">Loading projects...</p>;
  }
  if (props.status === "error") {
    return (
      <div role="alert" className="request-error">
        <p>Projects could not load. Check your connection or try later.</p>
        <button type="button" onClick={props.onRetry}>
          Retry
        </button>
      </div>
    );
  }
  if (props.projects.length === 0) {
    return <p role="status">No public projects yet.</p>;
  }
  return (
    <div className="projects-list">
      {props.projects.map(function (project) {
        return <ProjectCard key={project._id} project={project} />;
      })}
    </div>
  );
}
