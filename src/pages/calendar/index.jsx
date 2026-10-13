import { useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiPlus } from "react-icons/fi";
import { formatDate } from "../../data";
import styles from "./styles.module.css";

const toIsoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const todayDate = toIsoDate(new Date());

const Calendar = ({ stories, onNewStory, onOpenStory }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [view, setView] = useState("week");

  const days = useMemo(() => {
    const current = new Date();
    current.setDate(current.getDate() + weekOffset * 7);
    current.setHours(12, 0, 0, 0);
    current.setDate(current.getDate() - ((current.getDay() + 6) % 7));
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(current);
      date.setDate(current.getDate() + index);
      const iso = toIsoDate(date);
      return { date, iso, stories: stories.filter((story) => story.date === iso) };
    });
  }, [stories, weekOffset]);

  const weekStories = days.flatMap((day) => day.stories).sort((a, b) => a.date.localeCompare(b.date));
  const first = days[0].date;
  const last = days.at(-1).date;
  const rangeLabel = first.getMonth() === last.getMonth()
    ? `${formatDate(toIsoDate(first), { month: "long" })} ${first.getDate()} - ${last.getDate()}, ${last.getFullYear()}`
    : `${formatDate(toIsoDate(first))} - ${formatDate(toIsoDate(last), { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <div className={styles.page}>
      <div className={styles.pageIntro}>
        <div><span className={styles.label}>PUBLISHING PLAN</span><h1>Good work, in its own time.</h1><p>Give every piece a date and a little room to find its people.</p></div>
        <button type="button" className={styles.addButton} onClick={() => onNewStory()}><FiPlus aria-hidden="true" /> Add to calendar</button>
      </div>

      <section className={styles.calendar} aria-label="Editorial calendar">
        <header className={styles.calendarHeader}>
          <div className={styles.monthTitle}><FiCalendar aria-hidden="true" /><div><strong>{rangeLabel}</strong><small>{weekStories.length} pieces planned this week</small></div></div>
          <div className={styles.controls}>
            <button type="button" aria-label="Previous week" onClick={() => setWeekOffset((value) => value - 1)}><FiArrowLeft /></button>
            <button type="button" onClick={() => setWeekOffset(0)}>Today</button>
            <button type="button" aria-label="Next week" onClick={() => setWeekOffset((value) => value + 1)}><FiArrowRight /></button>
          </div>
          <div className={styles.viewSwitch} aria-label="Calendar view">
            <button type="button" className={view === "week" ? styles.viewActive : ""} onClick={() => setView("week")}>Week</button>
            <button type="button" className={view === "agenda" ? styles.viewActive : ""} onClick={() => setView("agenda")}>Agenda</button>
          </div>
        </header>

        {view === "week" ? <div className={styles.weekGrid}>
          {days.map((day) => <section className={`${styles.day} ${day.iso === todayDate ? styles.today : ""}`} key={day.iso}>
            <header><span>{day.date.toLocaleDateString("en-US", { weekday: "short" })}</span><strong>{day.date.getDate()}</strong></header>
            <div className={styles.dayBody}>
              {day.stories.map((story) => <button type="button" className={`${styles.event} ${styles["event" + story.status.replaceAll(" ", "")]}`} key={story.id} onClick={() => onOpenStory(story)}>
                <span>{story.type}</span><strong>{story.title}</strong><small>{story.author}</small>
              </button>)}
              <button type="button" className={styles.addDay} aria-label={`Add a story on ${formatDate(day.iso, { weekday: "long", month: "long", day: "numeric" })}`} onClick={() => onNewStory(day.iso)}><FiPlus aria-hidden="true" /><span>Add</span></button>
            </div>
          </section>)}
        </div> : <div className={styles.agenda}>
          {weekStories.length ? weekStories.map((story) => <button type="button" className={styles.agendaRow} key={story.id} onClick={() => onOpenStory(story)}>
            <span className={styles.agendaDate}><strong>{formatDate(story.date, { day: "2-digit" })}</strong><small>{formatDate(story.date, { weekday: "short", month: "short" })}</small></span>
            <span className={styles.agendaTitle}><strong>{story.title}</strong><small>{story.type} <i /> {story.author}</small></span>
            <span className={`${styles.status} ${styles["status" + story.status.replaceAll(" ", "")]}`}>{story.status}</span>
            <FiArrowRight aria-hidden="true" />
          </button>) : <div className={styles.empty}><strong>A little breathing room.</strong><p>Nothing is planned for this week yet.</p><button type="button" onClick={() => onNewStory(days[0].iso)}><FiPlus /> Add a story</button></div>}
        </div>}
      </section>

      <div className={styles.calendarNote}><span className={styles.noteDot} /><p>Dates are a planning guide. Publishing here updates the workspace only.</p><button type="button" onClick={() => setWeekOffset(0)}>Return to this week</button></div>
    </div>
  );
};

export default Calendar;
