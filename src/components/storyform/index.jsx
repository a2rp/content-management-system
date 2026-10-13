import { useState } from "react";
import { FiCalendar, FiCheck, FiFileText, FiSend } from "react-icons/fi";
import { contentStatuses, contentTypes } from "../../data";
import styles from "./styles.module.css";

const authors = ["Mara Ellis", "Anika Rao", "Sofia Bennett", "Theo Martin"];
const today = () => new Date().toISOString().slice(0, 10);
const defaultDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toISOString().slice(0, 10);
};

const StoryForm = ({ initialStory, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialStory?.title || "");
  const [excerpt, setExcerpt] = useState(initialStory?.excerpt || "");
  const [type, setType] = useState(initialStory?.type || contentTypes[0]);
  const [status, setStatus] = useState(initialStory?.status || "Draft");
  const [author, setAuthor] = useState(initialStory?.author || authors[0]);
  const [date, setDate] = useState(initialStory?.date || defaultDate());
  const [body, setBody] = useState(initialStory?.body || "");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!title.trim() || !excerpt.trim() || !body.trim() || !date) {
      setError("Add a headline, short summary, story text, and publish date.");
      return;
    }
    if (status === "Scheduled" && date < today()) {
      setError("Choose today or a future date for scheduled content.");
      return;
    }
    onSubmit({
      ...(initialStory || {}),
      title: title.trim(),
      excerpt: excerpt.trim(),
      type,
      status,
      author,
      date,
      body: body.trim(),
      reviewNote: status === "Changes requested" ? initialStory?.reviewNote || "" : "",
      updated: "Just now",
    });
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.intro}><span><FiFileText aria-hidden="true" /></span><p>Give this piece a clear headline, a useful summary, and a place on the publishing calendar.</p></div>
      <label className={styles.field}>Headline<input autoFocus required maxLength={90} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. A studio visit with North Coast Press" /></label>
      <label className={styles.field}>Short summary<textarea required rows="2" maxLength={180} value={excerpt} onChange={(event) => setExcerpt(event.target.value)} placeholder="A short description for the content library" /><small>{excerpt.length} / 180</small></label>
      <div className={styles.columns}>
        <label className={styles.field}>Content type<select value={type} onChange={(event) => setType(event.target.value)}>{contentTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className={styles.field}>Workflow status<select value={status} onChange={(event) => setStatus(event.target.value)}>{contentStatuses.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className={styles.columns}>
        <label className={styles.field}>Owner<select value={author} onChange={(event) => setAuthor(event.target.value)}>{authors.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className={styles.field}>Publish date<span className={styles.dateField}><FiCalendar aria-hidden="true" /><input type="date" required value={date} onChange={(event) => setDate(event.target.value)} /></span></label>
      </div>
      <label className={styles.field}>Story text<textarea required rows="7" maxLength="3000" value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write the first draft here..." /><small>{body.length} / 3000</small></label>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.actions}><button type="button" className={styles.cancel} onClick={onCancel}>Cancel</button><button type="submit" className={styles.save}><FiSend aria-hidden="true" /> {initialStory ? "Save changes" : "Create story"} <FiCheck aria-hidden="true" /></button></div>
    </form>
  );
};

export default StoryForm;
