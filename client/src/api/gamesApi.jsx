const API_URL = "http://localhost:5000";

export const searchGames = async (query) => {
  const response = await fetch(
    `${API_URL}/games/search?query=${encodeURIComponent(query)}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Błąd wyszukiwania gier");
  }

  return data.data || [];
};
