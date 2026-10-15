import { Routes, Route } from "react-router";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPAge";
import AlbumPage from "./pages/AlbumPage"
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
      </Route>
    </Routes>
  );
}

export default App;