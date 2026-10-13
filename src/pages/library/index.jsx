import { useMemo, useState } from "react";
import { FiArrowDownWideNarrow, FiDownload, FiEdit3, FiEye, FiFileText, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { contentStatuses, contentTypes, formatDate } from "../../data";
import styles from "./styles.module.css";

const statusFilters = ["All content", ...contentStatuses];

const exportStories = (stories) => {
  const rows = [["ID", "Headline", "Type", "Status", "Owner", "Publish date"], ...stories.map((story) => [story.id, story.title, story.type, story.status, story.author, story.date])];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "morrow-content-library.csv";
  anchor.click();
  URL.revokeObjectURL(url);
};

const Library = ({ stories, query, onQueryChange, onNewStory, onEditStory, onOpenStory, onDeleteStory, onUpdateStatus }) => {
  const [statusFilter, setStatusFilter] = useState("All content");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [sort, setSort] = useState("updated");

  const filtered = useMemo(() => {
    const list = stories.filter((story) => {
      const matchesText = `${story.title} ${story.excerpt} ${story.author} ${story.id}`.toLowerCase().includes(query.trim().toLowerCase());
      const matchesStatus = statusFilter === "All content" || story.status === statusFilter;
      const matchesType = typeFilter === "All types" || story.type === typeFilter;
      return matchesText && matchesStatus && matchesType;
    });
    return [...list].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "date") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date) || a.title.localeCompare(b.title);
    });
  }, [stories, query, statusFilter, typeFilter, sort]);

  return (
    <div className={styles.page}>
      <div className={styles.pageIntro}>
        <div><span className={styles.label}>THE LIBRARY</span><h1>Stories, in good company.</h1><p>Every draft, note, and published piece has a place here.</p></div>
        <div className={styles.actions}><button type="button" className={styles.export} onClick={() => exportStories(filtered)}><FiDownload aria-hidden="true" /> Export list</button><button type="button" className={styles.create} onClick={onNewStory}><FiPlus aria-hidden="true" /> New story</button></div>
      </div>

      <section className={styles.library} aria-label="Content library">
        <div className={styles.toolbar}>
          <label className={styles.search}><FiSearch aria-hidden="true" /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Find a story, owner, or ID" aria-label="Search the content library" /></label>
          <label className={styles.typeSelect}><span>Type</span><select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option>All types</option>{contentTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className={styles.sort}><FiArrowDownWideNarrow aria-hidden="true" /><span>Sort</span><select aria-label="Sort content" value={sort} onChange={(event) => setSort(event.target.value)}><option value="updated">Publish date</option><option value="date">Oldest first</option><option value="title">Headline A to Z</option></select></label>
        </div>

        <nav className={styles.filters} aria-label="Filter stories by status">{statusFilters.map((filter) => <button type="button" key={filter} className={filter === statusFilter ? styles.activeFilter : ""} onClick={() => setStatusFilter(filter)}>{filter}<span>{filter === "All content" ? stories.length : stories.filter((story) => story.status === filter).length}</span></button>)}</nav>

        <div className={styles.columnHead}><span>CONTENT</span><span>OWNER</span><span>PUBLISH DATE</span><span>STATUS</span><span>QUICK ACTIONS</span></div>
        {filtered.length ? <div className={styles.list}>{filtered.map((story) => <article className={styles.row} key={story.id}>
          <div className={styles.contentCell}><span className={styles.typeIcon}><FiFileText aria-hidden="true" /></span><div><div className={styles.titleLine}><strong>{story.title}</strong><span>{story.id}</span></div><p>{story.excerpt}</p><small>{story.type} <i /> Updated {story.updated}</small></div></div>
          <div className={styles.owner}><span>{story.author.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><strong>{story.author}</strong></div>
          <div className={styles.date}><strong>{formatDate(story.date, { month: "short", day: "numeric", year: "numeric" })}</strong><small>{story.status === "Published" ? "Published" : "Planned"}</small></div>
          <label className={styles.statusSelect}><span className={`${styles.statusDot} ${styles["dot" + story.status.replaceAll(" ", "")]}`} /><select aria-label={`Change status for ${story.title}`} value={story.status} onChange={(event) => onUpdateStatus(story.id, event.target.value)}>{contentStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
          <div className={styles.rowActions}>
            <button type="button" aria-label={`View ${story.title}`} title="View" onClick={() => onOpenStory(story)}><FiEye aria-hidden="true" /></button>
            <button type="button" aria-label={`Edit ${story.title}`} title="Edit" onClick={() => onEditStory(story)}><FiEdit3 aria-hidden="true" /></button>
            <button type="button" aria-label={`Delete ${story.title}`} title="Delete" className={styles.delete} onClick={() => onDeleteStory(story)}><FiTrash2 aria-hidden="true" /></button>
          </div>
        </article>)}</div> : <div className={styles.empty}><span><FiSearch aria-hidden="true" /></span><strong>No stories in this view</strong><p>Try another search or filter, or write something new.</p><button type="button" onClick={() => { onQueryChange(""); setStatusFilter("All content"); setTypeFilter("All types"); }}>Clear filters</button></div>}
        <footer className={styles.listFoot}><span>Showing <strong>{filtered.length}</strong> of <strong>{stories.length}</strong> pieces</span><span>Draft changes stay in this browser session</span></footer>
      </section>
    </div>
  );
};

export default Library;
