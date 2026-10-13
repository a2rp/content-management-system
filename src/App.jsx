import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Footer from "./components/footer";
import Header from "./components/header";
import Modal, { ConfirmDialog } from "./components/modal";
import ReviewForm from "./components/reviewform";
import ScrollToTop from "./components/scrollToTop";
import StoryForm from "./components/storyform";
import Toast from "./components/toast";
import { initialStories } from "./data";
import styles from "./App.module.css";

const App = () => {
  const [stories, setStories] = useState(initialStories);
  const [query, setQuery] = useState("");
  const [dialog, setDialog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ message: "", tone: "success" });
  const navigate = useNavigate();

  const notify = useCallback((message, tone = "success") => setToast({ message, tone }), []);
  const closeDialog = () => setDialog(null);
  const newStory = (date, status) => setDialog({ type: "create", date, status });
  const editStory = (story) => setDialog({ type: "edit", story });
  const openStory = (story) => setDialog({ type: "view", story });

  const createStory = (story) => {
    const nextStory = { ...story, id: `MOR-${String(Date.now()).slice(-4)}` };
    setStories((current) => [nextStory, ...current]);
    closeDialog();
    notify("Your story is in the editorial library.");
  };

  const updateStory = (updatedStory) => {
    setStories((current) => current.map((story) => story.id === updatedStory.id ? updatedStory : story));
    closeDialog();
    notify("Story updates are ready for this visit.");
  };

  const updateStatus = (storyId, status) => {
    setStories((current) => current.map((story) => story.id === storyId ? {
      ...story,
      status,
      reviewNote: status === "Changes requested" ? story.reviewNote : "",
      updated: "Just now",
    } : story));
    notify(`Story moved to ${status.toLowerCase()}.`);
  };

  const approveStory = (story) => {
    setStories((current) => current.map((item) => item.id === story.id ? { ...item, status: "Scheduled", reviewNote: "", updated: "Just now" } : item));
    notify("Approved and added to the publishing calendar.");
  };

  const requestChanges = (story) => setDialog({ type: "review", story });
  const submitReview = (note) => {
    const storyId = dialog.story.id;
    setStories((current) => current.map((story) => story.id === storyId ? { ...story, status: "Changes requested", reviewNote: note, updated: "Just now" } : story));
    closeDialog();
    notify("Review note sent to the story owner.");
  };

  const confirmDelete = () => {
    setStories((current) => current.filter((story) => story.id !== deleteTarget.id));
    setDeleteTarget(null);
    notify("Story removed from the library.");
  };

  const submitSearch = (value) => {
    setQuery(value);
    navigate("/library");
  };

  const reviewCount = stories.filter((story) => story.status === "In review").length;

  return (
    <div className={styles.app}>
      <Header
        reviewCount={reviewCount}
        searchValue={query}
        onSearchChange={setQuery}
        onSearch={submitSearch}
        onNewContent={() => newStory()}
      />
      <ScrollToTop />
      <main id="main-content" className={styles.main}>
        <AppRoutes
          stories={stories}
          query={query}
          onQueryChange={setQuery}
          onNewContent={() => newStory()}
          onNewStory={(date) => newStory(date)}
          onEditStory={editStory}
          onOpenStory={openStory}
          onDeleteStory={setDeleteTarget}
          onUpdateStatus={updateStatus}
          onApprove={approveStory}
          onRequestChanges={requestChanges}
        />
      </main>
      <Footer />

      {dialog?.type === "create" ? <Modal title="Write a new story" description="Shape a new piece for the Morrow editorial calendar." onClose={closeDialog} size="large"><StoryForm defaultDate={dialog.date} defaultStatus={dialog.status} onSubmit={createStory} onCancel={closeDialog} /></Modal> : null}
      {dialog?.type === "edit" ? <Modal title="Edit story" description="Update the headline, draft, owner, or publishing plan." onClose={closeDialog} size="large"><StoryForm key={dialog.story.id} initialStory={dialog.story} onSubmit={updateStory} onCancel={closeDialog} /></Modal> : null}
      {dialog?.type === "review" ? <Modal title="Request a revision" description="Give the author a specific, considerate next step." onClose={closeDialog}><ReviewForm story={dialog.story} onSubmit={submitReview} onCancel={closeDialog} /></Modal> : null}
      {dialog?.type === "view" ? <Modal title={dialog.story.title} description={`${dialog.story.type} · ${dialog.story.id}`} onClose={closeDialog} size="large"><article className={styles.storyView}><div className={styles.storyMeta}><span>{dialog.story.status}</span><span>{dialog.story.author}</span><span>{dialog.story.date}</span></div><p className={styles.storyExcerpt}>{dialog.story.excerpt}</p><p className={styles.storyBody}>{dialog.story.body}</p><button type="button" onClick={() => editStory(dialog.story)}>Edit this story</button></article></Modal> : null}
      {deleteTarget ? <ConfirmDialog title="Remove this story?" description={`“${deleteTarget.title}” will be removed from the library for this visit.`} confirmLabel="Remove story" onConfirm={confirmDelete} onClose={() => setDeleteTarget(null)} /> : null}
      <Toast message={toast.message} tone={toast.tone} onDismiss={() => setToast({ message: "", tone: "success" })} />
    </div>
  );
};

export default App;
