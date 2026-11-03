import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPosts } from "../api.js";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  function retry() {
    setAttempt(attempt + 1);
  }
  useEffect(
    function () {
      let active = true;
      setStatus("loading");
      getPosts()
        .then(function (data) {
          if (active) {
            setPosts(data);
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
    <section id="blog">
      <h2>Blog</h2>
      {status === "loading" ? <p role="status">Loading posts...</p> : null}
      {status === "error" ? (
        <div role="alert" className="request-error">
          <p>Posts could not load. Check your connection or try later.</p>
          <button type="button" onClick={retry}>Retry</button>
        </div>
      ) : null}
      {status === "success" && posts.length === 0 ? (
        <p role="status">No blog posts yet.</p>
      ) : null}
      {status === "success" && posts.length > 0 ? (
        <div className="projects-list">
          {posts.map(function (post) {
            let author = "Unknown";
            if (post.author && post.author.username) {
              author = post.author.username;
            }
            let date = "";
            if (post.createdAt) {
              date = new Date(post.createdAt).toLocaleDateString();
            }
            return (
              <article key={post._id} className="min-w-0 flex-1 basis-72 rounded-xl border border-slate-500 p-4">
                <h3 className="break-words text-xl font-bold">{post.title}</h3>
                <p className="text-sm">{author} · {date}</p>
                <p>{post.content.length > 160 ? post.content.slice(0, 160) + "..." : post.content}</p>
                <Link to={"/blog/" + post._id}>Read post</Link>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
