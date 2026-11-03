import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { addComment, getPost } from "../api.js";
import { useAuth } from "../hooks/useAuth.js";

export default function BlogDetail() {
  const params = useParams();
  const postId = params.postId;
  const auth = useAuth();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  const [body, setBody] = useState("");
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);

  function load() {
    setAttempt(attempt + 1);
  }

  useEffect(
    function () {
      let active = true;
      setStatus("loading");
      getPost(postId)
        .then(function (data) {
          if (active) {
            setPost(data);
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
    [postId, attempt]
  );

  async function handleComment(event) {
    event.preventDefault();
    setFeedback("");
    if (body.trim().length === 0) {
      setFeedback("Write a comment first.");
      return;
    }
    setSending(true);
    try {
      await addComment(postId, { body: body.trim() });
      setBody("");
      load();
    } catch (error) {
      setFeedback(error.message);
    }
    setSending(false);
  }

  if (status === "loading") {
    return <p role="status">Loading post...</p>;
  }
  if (status === "error") {
    return (
      <section role="alert">
        <h2>Post unavailable</h2>
        <p>Check the address or connection, or try again later.</p>
        <button type="button" onClick={load}>Retry</button>
        <p><Link to="/blog">Return to Blog</Link></p>
      </section>
    );
  }

  let author = "Unknown";
  if (post.author && post.author.username) {
    author = post.author.username;
  }
  let date = "";
  if (post.createdAt) {
    date = new Date(post.createdAt).toLocaleDateString();
  }

  return (
    <article id="blog-post">
      <h2>{post.title}</h2>
      <p className="text-sm">{author} · {date}</p>
      <p className="post-content">{post.content}</p>

      <section id="comments">
        <h3>Comments ({post.comments.length})</h3>
        {auth.isLoggedIn ? (
          <form className="contact-form" onSubmit={handleComment}>
            <label htmlFor="comment-body">Your comment</label>
            <textarea
              id="comment-body"
              rows={3}
              maxLength={1000}
              value={body}
              onChange={function (event) {
                setBody(event.target.value);
              }}
            />
            {feedback ? <p role="alert" className="form-feedback">{feedback}</p> : null}
            <button type="submit" disabled={sending}>
              {sending ? "Posting..." : "Post comment"}
            </button>
          </form>
        ) : (
          <p><Link to="/login">Log in</Link> to post a comment.</p>
        )}

        {post.comments.length === 0 ? (
          <p role="status">No comments yet.</p>
        ) : (
          <div>
            {post.comments.map(function (comment) {
              let commentAuthor = "Unknown";
              if (comment.author && comment.author.username) {
                commentAuthor = comment.author.username;
              }
              return (
                <div key={comment._id} className="comment-item">
                  <p className="text-sm"><strong>{commentAuthor}</strong> · {new Date(comment.createdAt).toLocaleDateString()}</p>
                  <p>{comment.body}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <p><Link to="/blog">Return to Blog</Link></p>
    </article>
  );
}
