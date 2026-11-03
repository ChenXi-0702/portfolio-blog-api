import { useState } from "react";
import { submitContact } from "../api.js";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    setFailed(false);
    if (name.trim().length < 2) {
      setFeedback("Enter at least 2 letters for your name.");
      setFailed(true);
      return;
    }
    if (message.trim().length < 10) {
      setFeedback("Enter at least 10 characters for your message.");
      setFailed(true);
      return;
    }
    setBusy(true);
    try {
      await submitContact({
        name: name.trim(), email: email.trim(), message: message.trim()
      });
      setFeedback("Message sent. Thank you!");
      setFailed(false);
      setName("");
      setEmail("");
      setMessage("");
    } catch (problem) {
      setFeedback(problem.message);
      setFailed(true);
    }
    setBusy(false);
  }

  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>Send me a message and it is saved for a reply.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          value={name}
          required
          minLength={2}
          maxLength={60}
          autoComplete="name"
          onChange={function (event) { setName(event.target.value); }}
        />
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          value={email}
          required
          maxLength={254}
          autoComplete="email"
          onChange={function (event) { setEmail(event.target.value); }}
        />
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          value={message}
          required
          rows={5}
          maxLength={2000}
          onChange={function (event) { setMessage(event.target.value); }}
        />
        {feedback ? (
          <p role={failed ? "alert" : "status"} className={failed ? "form-feedback" : "form-success"}>
            {feedback}
          </p>
        ) : null}
        <button type="submit" disabled={busy}>
          {busy ? "Sending..." : "Send message"}
        </button>
      </form>
    </section>
  );
}
