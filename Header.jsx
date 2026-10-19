import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header({ query, setQuery, onSearch }) {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query);
    navigate("/");
  }
  return <header className="site-header">
    <div className="header-inner">
      <Link className="brand" to="/" onClick={() => { setQuery(""); onSearch(""); }}>
        <span className="brand-mark">M</span><span>Movie<span className="brand-accent">Shelf</span></span>
      </Link>
      <form className="search-form" onSubmit={handleSubmit} role="search">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies..." aria-label="Search movies" />
        {query && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => { setQuery(""); onSearch(""); navigate("/"); }}>×</button>}
        <button className="search-submit" type="submit">Search</button>
      </form>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/" end>Discover</NavLink>
        <NavLink to="/favorites">♥ <span>My Shelf</span></NavLink>
      </nav>
    </div>
  </header>;
}