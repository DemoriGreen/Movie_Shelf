const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function request(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error("TMDB API key missing. Add VITE_TMDB_API_KEY to your .env file, then restart the dev server.");
  }
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 401) throw new Error("TMDB rejected the API key. Check your .env value.");
    if (response.status === 429) throw new Error("Too many requests. Please wait a moment and try again.");
    throw new Error(`TMDB request failed (${response.status}). Please try again.`);
  }
  return response.json();
}

export async function getPopularMovies(page = 1) {
  const data = await request("/movie/popular", { page });
  return data.results || [];
}

export async function searchMovies(query, page = 1) {
  const data = await request("/search/movie", { query: query.trim(), page, include_adult: false });
  return data.results || [];
}

export async function getMovieDetails(movieId) {
  return request(`/movie/${movieId}`, { append_to_response: "credits,videos" });
}

export const getPosterUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
