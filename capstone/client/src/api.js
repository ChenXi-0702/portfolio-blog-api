const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, options) {
  const settings = options || {};
  const headers = { "Content-Type": "application/json" };
  if (settings.token) {
    headers.Authorization = "Bearer " + settings.token;
  }
  const response = await fetch(BASE + path, {
    method: settings.method || "GET",
    headers: headers,
    body: settings.body ? JSON.stringify(settings.body) : undefined
  });
  if (response.status === 204) {
    return null;
  }
  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }
  if (!response.ok) {
    let message = "Request failed. Try again later.";
    if (data && data.error && data.error.message) {
      message = data.error.message;
    }
    throw new Error(message);
  }
  return data;
}

// Accounts
export function registerUser(body) {
  return request("/users/register", { method: "POST", body: body });
}
export function loginUser(body) {
  return request("/users/login", { method: "POST", body: body });
}

// Portfolio projects
export function getProjects() {
  return request("/projects");
}
export function getProject(projectId) {
  return request("/projects/" + projectId);
}
export function createProject(body) {
  return request("/projects", { method: "POST", body: body, token: getToken() });
}
export function updateProject(projectId, body) {
  return request("/projects/" + projectId, {
    method: "PUT", body: body, token: getToken()
  });
}
export function deleteProject(projectId) {
  return request("/projects/" + projectId, {
    method: "DELETE", token: getToken()
  });
}

// Blog posts
export function getPosts() {
  return request("/blog");
}
export function getPost(postId) {
  return request("/blog/" + postId);
}
export function createPost(body) {
  return request("/blog", { method: "POST", body: body, token: getToken() });
}
export function updatePost(postId, body) {
  return request("/blog/" + postId, {
    method: "PUT", body: body, token: getToken()
  });
}
export function deletePost(postId) {
  return request("/blog/" + postId, { method: "DELETE", token: getToken() });
}

// Comments
export function getComments(postId) {
  return request("/blog/" + postId + "/comments");
}
export function addComment(postId, body) {
  return request("/blog/" + postId + "/comments", {
    method: "POST", body: body, token: getToken()
  });
}

// Contact form
export function submitContact(body) {
  return request("/contact", { method: "POST", body: body });
}
