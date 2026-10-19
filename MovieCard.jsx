import { getPosterUrl } from "../services/movieService.js";

export default function MovieCard({ movie, isFavorite, onToggleFavorite, onSelect }) {
  const title = movie.title || movie.name || "Untitled";
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "Year unknown";
  const poster = getPosterUrl(movie.poster_path);
  return <article className="movie-card">
    <button className="poster-button" onClick={() => onSelect(movie)} aria-label={`View details for ${title}`}>
      {poster ? <img className="movie-poster" src={poster} alt={`${title} poster`} loading="lazy" /> :
        <div className="poster-placeholder"><span>🎬</span><small>No poster available</small></div>}
      <span className="poster-overlay">View details ↗</span>
    </button>
    <button className={`favorite-toggle ${isFavorite ? "is-favorite" : ""}`} onClick={() => onToggleFavorite(movie)}
      aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
      title={isFavorite ? "Remove from My Shelf" : "Add to My Shelf"}>{isFavorite ? "♥" : "♡"}</button>
    <div className="movie-info">
      <h3 title={title}>{title}</h3>
      <div className="movie-meta"><span>{year}</span><span className="rating">★ {Number(movie.vote_average || 0).toFixed(1)}</span></div>
    </div>
  </article>;
}