import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiEdit3, FiFileText, FiSend } from "react-icons/fi";
import { formatDate } from "../../data";
import styles from "./styles.module.css";

const Overview = ({ stories, onNewContent, onOpenStory }) => {
  const inReview = stories.filter((story) => story.status === "In review");
  const scheduled = stories.filter((story) => story.status === "Scheduled").sort((a, b) => a.date.localeCompare(b.date));
  const drafts = stories.filter((story) => story.status === "Draft");
  const published = stories.filter((story) => story.status === "Published").length;

  return (
    <div className={styles.page}>
      <div className={styles.pageNote}><span>EDITION 08</span><i /> <span>Tuesday, October 13, 2026</span><span className={styles.noteRight}>A little space for good work</span></div>

      <section className={styles.cover}>
        <div className={styles.coverText}>
          <span className={styles.coverLabel}>MORROW JOURNAL / THE EDITORIAL DESK</span>
          <h1>Make room for good stories.</h1>
          <p>One thoughtful place to shape the next story, share it with your team, and choose when it goes out.</p>
          <div className={styles.coverActions}>
            <button type="button" onClick={onNewContent}><FiEdit3 aria-hidden="true" /> Write a story</button>
            <Link to="/library">Browse the library <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.teamLine}><span className={styles.avatars}><i>ME</i><i>AR</i><i>SB</i></span><span>Made with care by your editorial team</span></div>
        </div>
        <div className={styles.coverArt} aria-label="Morrow Journal, Volume 08">
          <span className={styles.artTop}>THE MORROW JOURNAL <span>VOL. 08 / OCTOBER</span></span>
          <div className={styles.artMark}><span>Words for</span><strong>the<br />in-between.</strong><i /></div>
          <span className={styles.artBottom}>PAPER / PEOPLE / PLACE</span>
        </div>
      </section>

      <section className={styles.stats} aria-label="Editorial workspace summary">
        <article><span className={styles.statIcon}><FiEdit3 /></span><small>Drafts</small><strong>{drafts.length.toString().padStart(2, "0")}</strong><span>Taking shape</span></article>
        <article><span className={styles.statIcon + " " + styles.red}><FiFileText /></span><small>In review</small><strong>{inReview.length.toString().padStart(2, "0")}</strong><span>Ready for a thoughtful look</span></article>
        <article><span className={styles.statIcon + " " + styles.gold}><FiCalendar /></span><small>Scheduled</small><strong>{scheduled.length.toString().padStart(2, "0")}</strong><span>On the calendar</span></article>
        <article><span className={styles.statIcon + " " + styles.green}><FiSend /></span><small>Published</small><strong>{published.toString().padStart(2, "0")}</strong><span>Shared with the world</span></article>
      </section>

      <div className={styles.lower}>
        <section className={styles.schedule}>
          <header><div><span className={styles.sectionLabel}>UP NEXT</span><h2>On the calendar</h2></div><Link to="/calendar">Open calendar <FiArrowRight /></Link></header>
          {scheduled.slice(0, 3).map((story) => <button type="button" className={styles.scheduleRow} key={story.id} onClick={() => onOpenStory(story)}>
            <span className={styles.date}><strong>{formatDate(story.date, { day: "2-digit" })}</strong><small>{formatDate(story.date, { month: "short" }).toUpperCase()}</small></span>
            <span className={styles.storyInfo}><strong>{story.title}</strong><small>{story.type} <i /> {story.author}</small></span>
            <span className={styles.status}>Scheduled</span>
            <FiArrowRight aria-hidden="true" />
          </button>)}
          {!scheduled.length && <p className={styles.empty}>There are no scheduled stories yet. Add one to your calendar.</p>}
        </section>

        <section className={styles.review}>
          <header><div><span className={styles.sectionLabel}>A SECOND PAIR OF EYES</span><h2>Needs a review</h2></div><span className={styles.reviewCount}>{inReview.length}</span></header>
          {inReview.slice(0, 2).map((story) => <button type="button" className={styles.reviewRow} key={story.id} onClick={() => onOpenStory(story)}>
            <span className={styles.reviewType}>{story.type === "Email" ? "EM" : "ST"}</span>
            <span><strong>{story.title}</strong><small>By {story.author} <i /> {formatDate(story.date)}</small></span>
            <FiArrowRight aria-hidden="true" />
          </button>)}
          {!inReview.length && <p className={styles.empty}>Nothing is waiting for review right now.</p>}
          <Link className={styles.reviewLink} to="/reviews">Go to review desk <FiArrowRight /></Link>
        </section>
      </div>
    </div>
  );
};

export default Overview;
