import { useEffect, useState } from "react";
import {
  createPost, createProject, deletePost, deleteProject,
  getPosts, getProjects, updatePost, updateProject
} from "../api.js";
import { useAuth } from "../hooks/useAuth.js";

const EMPTY_PROJECT = {
  title: "", description: "", imageUrl: "", repoUrl: "", liveUrl: ""
};
const EMPTY_POST = { title: "", content: "" };

export default function Admin() {
  const auth = useAuth();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);
  const [postForm, setPostForm] = useState(EMPTY_POST);
  const [editingProject, setEditingProject] = useState("");
  const [editingPost, setEditingPost] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function refreshProjects() {
    getProjects().then(setProjects).catch(function () {
      setProjects([]);
    });
  }
  function refreshPosts() {
    getPosts().then(setPosts).catch(function () {
      setPosts([]);
    });
  }
  useEffect(function () {
    refreshProjects();
    refreshPosts();
  }, []);

  function clearMessages() {
    setNotice("");
    setError("");
  }

  function changeProject(event) {
    const field = event.target.name;
    setProjectForm({ ...projectForm, [field]: event.target.value });
  }
  function changePost(event) {
    const field = event.target.name;
    setPostForm({ ...postForm, [field]: event.target.value });
  }

  async function saveProject(event) {
    event.preventDefault();
    clearMessages();
    try {
      if (editingProject) {
        await updateProject(editingProject, projectForm);
        setNotice("Project updated.");
      } else {
        await createProject(projectForm);
        setNotice("Project created.");
      }
      setProjectForm(EMPTY_PROJECT);
      setEditingProject("");
      refreshProjects();
    } catch (problem) {
      setError(problem.message);
    }
  }

  async function savePost(event) {
    event.preventDefault();
    clearMessages();
    try {
      if (editingPost) {
        await updatePost(editingPost, postForm);
        setNotice("Post updated.");
      } else {
        await createPost(postForm);
        setNotice("Post created.");
      }
      setPostForm(EMPTY_POST);
      setEditingPost("");
      refreshPosts();
    } catch (problem) {
      setError(problem.message);
    }
  }

  async function removeProject(projectId) {
    clearMessages();
    if (!window.confirm("Delete this project?")) {
      return;
    }
    try {
      await deleteProject(projectId);
      setNotice("Project deleted.");
      refreshProjects();
    } catch (problem) {
      setError(problem.message);
    }
  }

  async function removePost(postId) {
    clearMessages();
    if (!window.confirm("Delete this post and its comments?")) {
      return;
    }
    try {
      await deletePost(postId);
      setNotice("Post deleted.");
      refreshPosts();
    } catch (problem) {
      setError(problem.message);
    }
  }

  function editProject(project) {
    clearMessages();
    setEditingProject(project._id);
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || "",
      repoUrl: project.repoUrl || "",
      liveUrl: project.liveUrl || ""
    });
  }
  function editPost(post) {
    clearMessages();
    setEditingPost(post._id);
    setPostForm({ title: post.title, content: post.content });
  }

  let roleHint = "Project changes need an admin account.";
  if (auth.user && auth.user.role === "admin") {
    roleHint = "You are an admin, so project changes are allowed.";
  }

  return (
    <section id="admin">
      <h2>Admin dashboard</h2>
      <p>Signed in as {auth.user.username} ({auth.user.role}). {roleHint}</p>
      {notice ? <p role="status" className="form-success">{notice}</p> : null}
      {error ? <p role="alert" className="form-feedback">{error}</p> : null}

      <div className="admin-grid">
        <div className="admin-panel">
          <h3>{editingProject ? "Edit project" : "Add project"}</h3>
          <form className="contact-form" onSubmit={saveProject}>
            <label htmlFor="project-title">Title</label>
            <input id="project-title" name="title" required minLength={3} maxLength={120}
              value={projectForm.title} onChange={changeProject} />
            <label htmlFor="project-description">Description</label>
            <textarea id="project-description" name="description" required rows={3}
              maxLength={2000} value={projectForm.description} onChange={changeProject} />
            <label htmlFor="project-image">Image URL (optional)</label>
            <input id="project-image" name="imageUrl" maxLength={500}
              value={projectForm.imageUrl} onChange={changeProject} />
            <label htmlFor="project-repo">Repository URL (optional)</label>
            <input id="project-repo" name="repoUrl" maxLength={500}
              value={projectForm.repoUrl} onChange={changeProject} />
            <label htmlFor="project-live">Live URL (optional)</label>
            <input id="project-live" name="liveUrl" maxLength={500}
              value={projectForm.liveUrl} onChange={changeProject} />
            <div className="form-actions">
              <button type="submit">{editingProject ? "Update project" : "Create project"}</button>
              {editingProject ? (
                <button type="button" onClick={function () {
                  setEditingProject(""); setProjectForm(EMPTY_PROJECT);
                }}>Cancel</button>
              ) : null}
            </div>
          </form>
        </div>

        <div className="admin-panel">
          <h3>Projects ({projects.length})</h3>
          {projects.length === 0 ? <p role="status">No projects yet.</p> : null}
          <ul className="admin-list">
            {projects.map(function (project) {
              return (
                <li key={project._id}>
                  <span>{project.title}</span>
                  <span className="admin-actions">
                    <button type="button" onClick={function () { editProject(project); }}>Edit</button>
                    <button type="button" onClick={function () { removeProject(project._id); }}>Delete</button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="admin-panel">
          <h3>{editingPost ? "Edit post" : "Create post"}</h3>
          <form className="contact-form" onSubmit={savePost}>
            <label htmlFor="post-title">Title</label>
            <input id="post-title" name="title" required minLength={3} maxLength={120}
              value={postForm.title} onChange={changePost} />
            <label htmlFor="post-content">Content</label>
            <textarea id="post-content" name="content" required rows={8} maxLength={10000}
              value={postForm.content} onChange={changePost} />
            <div className="form-actions">
              <button type="submit">{editingPost ? "Update post" : "Create post"}</button>
              {editingPost ? (
                <button type="button" onClick={function () {
                  setEditingPost(""); setPostForm(EMPTY_POST);
                }}>Cancel</button>
              ) : null}
            </div>
          </form>
        </div>

        <div className="admin-panel">
          <h3>Blog posts ({posts.length})</h3>
          {posts.length === 0 ? <p role="status">No posts yet.</p> : null}
          <ul className="admin-list">
            {posts.map(function (post) {
              return (
                <li key={post._id}>
                  <span>{post.title}</span>
                  <span className="admin-actions">
                    <button type="button" onClick={function () { editPost(post); }}>Edit</button>
                    <button type="button" onClick={function () { removePost(post._id); }}>Delete</button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
