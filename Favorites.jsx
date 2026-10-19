import MovieGrid from "../components/MovieGrid.jsx";

export default function Favorites({ favorites, onToggleFavorite, onSelect }) {
  return <main className="page-shell favorites-page">
    <section className="favorites-banner"><p className="eyebrow">THE COLLECTION THAT'S ALL YOURS</p><h1>My <span>Shelf.</span></h1><p>All the movies you want to remember, revisit, and recommend.</p><div className="collection-count"><strong>{favorites.length}</strong><span>{favorites.length === 1 ? "movie saved" : "movies saved"}</span></div></section>
    {favorites.length ? <MovieGrid movies={favorites} favorites={favorites} onToggleFavorite={onToggleFavorite} onSelect={onSelect} /> :
      <div className="empty-collection"><div className="empty-heart">♡</div><h2>Your shelf is waiting</h2><p>Tap the heart on any movie to save it here for later.</p><a className="button button-primary" href="/">Explore movies</a></div>}
  </main>;
}