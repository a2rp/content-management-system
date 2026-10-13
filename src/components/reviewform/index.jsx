import { useState } from "react";
import { FiMessageSquare, FiSend } from "react-icons/fi";
import styles from "./styles.module.css";

const ReviewForm = ({ story, onSubmit, onCancel }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (note.trim().length < 12) {
      setError("Add a little more detail so the author knows what to revisit.");
      return;
    }
    onSubmit(note.trim());
  };

  return (
    <form className={styles.form} noValidate onSubmit={submit}>
      <div className={styles.storyName}><FiMessageSquare aria-hidden="true" /><span><strong>{story.title}</strong><small>By {story.author}</small></span></div>
      <label>Notes for the author<textarea autoFocus required maxLength={400} rows="5" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Share a clear, kind note about what could be stronger..." /><small>{note.length} / 400</small></label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <p className={styles.helper}>This note will stay with the story and move it to Changes requested.</p>
      <div className={styles.actions}><button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button><button type="submit" className={styles.submit}><FiSend aria-hidden="true" /> Send review note</button></div>
    </form>
  );
};

export default ReviewForm;
