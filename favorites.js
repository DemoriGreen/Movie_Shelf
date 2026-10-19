const STORAGE_KEY = "movieshelf-favorites";

export function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function saveFavorites(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

export function toggleFavorite(movie, favorites) {
  const exists = favorites.some((item) => item.id === movie.id);
  const updated = exists
    ? favorites.filter((item) => item.id !== movie.id)
    : [...favorites, movie];
  saveFavorites(updated);
  return updated;
}
