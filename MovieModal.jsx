import { useEffect, useState } from "react";
import { getMovieDetails, getPosterUrl } from "../services/movieService.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(movie);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    getMovieDetails(movie.id).then((data) => { if (active) setDetails(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { active = false; window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [movie.id, onClose]);
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="movie-modal" role="dialog" aria-modal="true" aria-label={`${movie.title} details`}>
      <button className="modal-close" onClick={onClose} aria-label="Close details">×</button>
      <div className="modal-art">{getPosterUrl(details.poster_path) ? <img src={getPosterUrl(details.poster_path)} alt="" /> : <div className="poster-placeholder">🎬</div>}</div>
      <div className="modal-content">
        <p className="eyebrow">MOVIE DETAILS</p><h2>{details.title}</h2>
        <p className="modal-meta">{(details.release_date || "").slice(0, 4) || "Release date unknown"} · ★ {Number(details.vote_average || 0).toFixed(1)} / 10</p>
        {loading ? <LoadingSpinner label="Loading details..." /> : error ? <p className="inline-error">{error}</p> :
          <><p className="overview">{details.overview || "No overview is available for this movie."}</p>
            {details.genres?.length > 0 && <div className="genre-list">{details.genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}</div>}
            {details.runtime > 0 && <p className="runtime">Runtime: {details.runtime} min</p>}
            {details.credits?.cast?.length > 0 && <p className="cast"><strong>Starring:</strong> {details.credits.cast.slice(0, 4).map((person) => person.name).join(", ")}</p>}
          </>}
      </div>
    </section>
  </div>;
}