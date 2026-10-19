import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({ movies, favorites, onToggleFavorite, onSelect }) {
  if (!movies.length) return <div className="empty-state"><span>🎞️</span><h2>No movies found</h2><p>Try another search or come back later.</p></div>;
  return <div className="movie-grid">
    {movies.map((movie) => <MovieCard key={movie.id} movie={movie}
      isFavorite={favorites.some((item) => item.id === movie.id)}
      onToggleFavorite={onToggleFavorite} onSelect={onSelect} />)}
  </div>;
}