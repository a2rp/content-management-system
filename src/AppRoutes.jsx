import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "./components/loading";

const Overview = lazy(() => import("./pages/overview"));
const Calendar = lazy(() => import("./pages/calendar"));
const Library = lazy(() => import("./pages/library"));
const Reviews = lazy(() => import("./pages/reviews"));

const AppRoutes = ({
  stories,
  query,
  onQueryChange,
  onNewContent,
  onNewStory,
  onEditStory,
  onOpenStory,
  onDeleteStory,
  onUpdateStatus,
  onApprove,
  onRequestChanges,
}) => {
  const location = useLocation();

  return (
    <Suspense key={location.pathname} fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Overview stories={stories} onNewContent={onNewContent} onOpenStory={onOpenStory} />} />
        <Route path="/calendar" element={<Calendar stories={stories} onNewStory={onNewStory} onOpenStory={onOpenStory} />} />
        <Route path="/library" element={<Library stories={stories} query={query} onQueryChange={onQueryChange} onNewStory={() => onNewStory()} onEditStory={onEditStory} onOpenStory={onOpenStory} onDeleteStory={onDeleteStory} onUpdateStatus={onUpdateStatus} />} />
        <Route path="/reviews" element={<Reviews stories={stories} onApprove={onApprove} onRequestChanges={onRequestChanges} onEditStory={onEditStory} />} />
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
