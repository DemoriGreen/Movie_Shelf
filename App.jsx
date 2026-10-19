import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import MovieModal from "./components/MovieModal.jsx";
import { readFavorites, toggleFavorite } from "./utils/favorites.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVersion, setSearchVersion] = useState(0);
  const [favorites, setFavorites] = useState(() => readFavorites());
  const [selectedMovie, setSelectedMovie] = useState(null);
  const location = useLocation();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [location.pathname]);
  const onSearch = useCallback((value) => {
    const normalized = value.trim();
    setSearchTerm(normalized);
    setSearchVersion((version) => version + 1);
  }, []);
  const onToggleFavorite = useCallback((movie) => {
    setFavorites((current) => toggleFavorite(movie, current));
  }, []);
  const onSelect = useCallback((movie) => setSelectedMovie(movie), []);

  return <div className="app">
    <Header query={query} setQuery={setQuery} onSearch={onSearch} />
    <Routes>
      <Route path="/" element={<Home searchTerm={searchTerm} searchVersion={searchVersion} favorites={favorites} onToggleFavorite={onToggleFavorite} onSelect={onSelect} />} />
      <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={onToggleFavorite} onSelect={onSelect} />} />
      <Route path="*" element={<main className="page-shell"><div className="empty-state"><h2>Page not found</h2><a href="/">Back to discover</a></div></main>} />
    </Routes>
    <footer className="site-footer"><div className="footer-brand">Movie<span>Shelf</span></div><p>Made for movie lovers. Movie data provided by TMDB.</p><p className="tmdb-note">This product uses the TMDB API but is not endorsed or certified by TMDB.</p></footer>
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
  </div>;
}