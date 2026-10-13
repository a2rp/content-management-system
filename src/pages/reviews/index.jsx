import { useState } from "react";
import { FiArrowRight, FiCheck, FiClock, FiEdit3, FiMessageSquare, FiUser } from "react-icons/fi";
import { formatDate } from "../../data";
import styles from "./styles.module.css";

const Reviews = ({ stories, onApprove, onRequestChanges, onEditStory }) => {
  const [filter, setFilter] = useState("In review");
  const [selectedId, setSelectedId] = useState("");
  const queue = stories.filter((story) => story.status === filter);
  const selected = queue.find((story) => story.id === selectedId) || queue[0];
  const waiting = stories.filter((story) => story.status === "In review").length;
  const changes = stories.filter((story) => story.status === "Changes requested").length;

  return (
    <div className={styles.page}>
      <div className={styles.pageIntro}>
        <div><span className={styles.label}>EDITORIAL WORKFLOW</span><h1>Good stories get a second look.</h1><p>Read with care. Leave a useful note. Help the next version get there.</p></div>
        <div className={styles.deskMark}><span><FiMessageSquare aria-hidden="true" /></span><strong>{waiting.toString().padStart(2, "0")}</strong><small>waiting for review</small></div>
      </div>

      <section className={styles.desk} aria-label="Editorial review desk">
        <aside className={styles.queue}>
          <header><div><span className={styles.sectionLabel}>YOUR QUEUE</span><h2>Stories to read</h2></div><span className={styles.queueTotal}>{queue.length}</span></header>
          <nav className={styles.tabs} aria-label="Review status">
            <button type="button" className={filter === "In review" ? styles.tabActive : ""} onClick={() => { setFilter("In review"); setSelectedId(""); }}>In review <span>{waiting}</span></button>
            <button type="button" className={filter === "Changes requested" ? styles.tabActive : ""} onClick={() => { setFilter("Changes requested"); setSelectedId(""); }}>Needs response <span>{changes}</span></button>
          </nav>
          <div className={styles.queueList}>
            {queue.map((story) => <button type="button" key={story.id} className={`${styles.queueItem} ${selected?.id === story.id ? styles.selected : ""}`} onClick={() => setSelectedId(story.id)}>
              <span className={styles.typeBadge}>{story.type === "Email" ? "EM" : story.type === "Social post" ? "SO" : "ST"}</span>
              <span className={styles.queueCopy}><strong>{story.title}</strong><small><FiUser aria-hidden="true" /> {story.author}</small><small><FiClock aria-hidden="true" /> Planned for {formatDate(story.date, { month: "short", day: "numeric" })}</small></span>
              <FiArrowRight className={styles.queueArrow} aria-hidden="true" />
            </button>)}
            {!queue.length && <div className={styles.queueEmpty}><span><FiCheck /></span><strong>All caught up</strong><p>There are no stories in this queue.</p></div>}
          </div>
        </aside>

        {selected ? <article className={styles.readingPane}>
          <div className={styles.storyMeta}><span className={styles.typeLabel}>{selected.type}</span><span>{selected.id}</span><span className={styles.statusPill}>{selected.status}</span></div>
          <h2>{selected.title}</h2>
          <p className={styles.excerpt}>{selected.excerpt}</p>
          <div className={styles.byline}><span>{selected.author.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong>{selected.author}</strong><small>Prepared for {formatDate(selected.date, { weekday: "long", month: "long", day: "numeric" })}</small></div></div>
          <div className={styles.rule}><i /></div>
          <div className={styles.storyBody}><p>{selected.body}</p></div>
          {selected.status === "Changes requested" && selected.reviewNote ? <div className={styles.reviewNote}><span><FiMessageSquare aria-hidden="true" /></span><div><strong>Previous review note</strong><p>{selected.reviewNote}</p></div></div> : null}
          <footer className={styles.reviewActions}>
            {selected.status === "In review" ? <>
              <button type="button" className={styles.requestButton} onClick={() => onRequestChanges(selected)}><FiMessageSquare aria-hidden="true" /> Request changes</button>
              <button type="button" className={styles.approveButton} onClick={() => onApprove(selected)}><FiCheck aria-hidden="true" /> Approve and schedule</button>
            </> : <button type="button" className={styles.approveButton} onClick={() => onEditStory(selected)}><FiEdit3 aria-hidden="true" /> Open story editor</button>}
          </footer>
        </article> : <div className={styles.emptyReading}><span><FiCheck /></span><h2>A quiet moment in the queue.</h2><p>Choose another review category or head back to the library.</p></div>}
      </section>
    </div>
  );
};

export default Reviews;
