import { useState } from "react";
import { searchGames } from "../api/gamesApi";
import { addUserGame } from "../api/userGamesApi";
import GameCard from "../components/GameCard";

function Home() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setMessage("Wpisz nazwę gry");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      const results = await searchGames(trimmedQuery);

      setGames(results);

      if (results.length === 0) {
        setMessage("Brak wyników");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGame = async (game) => {
    try {
      const data = await addUserGame(game);
      setMessage(data.message || "Dodano grę do listy");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h1>GrindList</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Wyszukaj grę"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit">Szukaj</button>
      </form>

      {isLoading && <p>Ładowanie...</p>}
      {message && <p>{message}</p>}

      <div>
        {games.map((game) => (
          <GameCard key={game.rawgId} game={game} onAdd={handleAddGame} />
        ))}
      </div>
    </div>
  );
}

export default Home;
