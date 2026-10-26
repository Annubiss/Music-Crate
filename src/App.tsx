import { Routes, Route } from "react-router";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPAge";
import AlbumPage from "./pages/AlbumPage"
import Layout from "./components/Layout";
import CollectionPage from "./pages/CollectionPage"
import PlaylistsPage from "./pages/PlaylistsPage";
import PlaylistDetailsPage from "./pages/PlaylistDetailsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path ="/collection" element={<CollectionPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/playlists/:id" element={<PlaylistDetailsPage />}/>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
      </Route>
    </Routes>
  );
}

export default App;