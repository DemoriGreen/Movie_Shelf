import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/movieService.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

export default function Home({ searchTerm, searchVersion, favorites, onToggleFavorite, onSelect }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    const load = async () => {
      try {
        const results = searchTerm.trim()
          ? await searchMovies(searchTerm, page)
          : await getPopularMovies(page);
        if (active) setMovies(results);
      } catch (err) {
        if (active) setError(err.message || "Unable to load movies.");
      } finally { if (active) setLoading(false); }
    };
    load();
    return () => { active = false; };
  }, [searchTerm, searchVersion, page, retryCount]);

  useEffect(() => { setPage(1); }, [searchTerm, searchVersion]);

  return <main className="page-shell">
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">YOUR NEXT FAVORITE FILM AWAITS</p>
        <h1>Every movie has<br />a <span>place on your shelf.</span></h1>
        <p className="hero-description">Discover what's popular, find hidden gems, and keep track of the films you love.</p>
        <div className="hero-stats"><span>✦ Curated discovery</span><span>♥ Your personal collection</span></div>
      </div>
      <div className="hero-decoration" aria-hidden="true"><div className="film-reel">✦</div><div className="floating-poster poster-one">CINEMA<br/><b>IS MAGIC</b></div><div className="floating-poster poster-two">YOUR<br/><b>NEXT WATCH</b></div></div>
    </section>
    <section className="catalog-section">
      <div className="section-heading"><div><p className="eyebrow">{searchTerm ? "SEARCH RESULTS" : "HANDPICKED FOR YOU"}</p><h2>{searchTerm ? `Results for “${searchTerm}”` : "Popular right now"}</h2><p className="section-subtitle">{searchTerm ? "Movies matching your search." : "The movies everyone's talking about."}</p></div></div>
      {loading ? <LoadingSpinner /> : error ? <ErrorMessage message={error} onRetry={() => setRetryCount((count) => count + 1)} /> :
        <MovieGrid movies={movies} favorites={favorites} onToggleFavorite={onToggleFavorite} onSelect={onSelect} />}
      {!loading && !error && movies.length > 0 && <div className="pagination"><button className="button button-secondary" disabled={page <= 1} onClick={() => { setPage((p) => p - 1); window.scrollTo({ top: 350, behavior: "smooth" }); }}>← Previous</button><span>Page {page}</span><button className="button button-secondary" onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 350, behavior: "smooth" }); }}>Next →</button></div>}
    </section>
  </main>;
}