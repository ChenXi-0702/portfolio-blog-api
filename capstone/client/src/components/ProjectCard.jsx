import { Link } from "react-router";

export default function ProjectCard(props) {
  const project = props.project;
  let description = project.description;
  if (!description) {
    description = "No description provided.";
  }
  let image = "/assets/project.jpg";
  if (project.imageUrl) {
    image = project.imageUrl;
  }
  return (
    <article className="min-w-0 flex-1 basis-72 rounded-xl border border-slate-500 p-4">
      <img
        className="mb-4 h-auto w-full rounded-lg"
        src={image}
        alt={project.title}
        width="640"
        height="360"
      />
      <h3 className="break-words text-xl font-bold">{project.title}</h3>
      <p>{description}</p>
      <p>
        <Link to={"/projects/" + project._id}>View details</Link>
      </p>
      {project.liveUrl ? (
        <a className="inline-block py-2 underline" href={project.liveUrl}>
          View live site
        </a>
      ) : null}
      {project.repoUrl ? (
        <a className="inline-block py-2 underline" href={project.repoUrl}>
          View repository
        </a>
      ) : null}
    </article>
  );
}
