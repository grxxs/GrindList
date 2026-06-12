import { useState } from "react";
import { searchGames } from "../api/gamesApi";
import { addUserGame } from "../api/userGamesApi";
import GameCard from "../components/GameCard";
import { useAuth } from "../context/useAuth";

function Home() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSearch = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    const titleRegex = /^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-:'’]+$/;

    if (!trimmedQuery) {
      setErrorMessage("Wpisz nazwę gry");
      setSuccessMessage("");
      return;
    }

    if (trimmedQuery.length > 50) {
      setErrorMessage("Tytuł może mieć maksymalnie 50 znaków");
      setSuccessMessage("");
      return;
    }

    if (!titleRegex.test(trimmedQuery)) {
      setErrorMessage("Tytuł zawiera niedozwolone znaki");
      setSuccessMessage("");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const results = await searchGames(trimmedQuery);

      setGames(results);

      if (results.length === 0) {
        setErrorMessage("Brak wyników");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGame = async (game) => {
    if (!user) {
      setSuccessMessage("");
      setErrorMessage("Zaloguj się, aby dodać grę do biblioteki");
      return;
    }

    try {
      const data = await addUserGame(game);
      setErrorMessage("");
      setSuccessMessage(data.message || "Dodano grę do listy");
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="home-page">
      <section className="hero">
        <p className="hero-kicker">Lista gier</p>
        <h1>
          Grind<span className="brand-gradient">List</span>
        </h1>
        <p className="hero-text">
          Odkrywaj nowe tytuły, buduj wymarzoną bibliotekę i miej pełną kontrolę
          nad swoją kolekcją – od gier w planach, przez te ogrywane, aż po z
          dumą ukończone.
        </p>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Wyszukaj grę"
            value={query}
            maxLength="50"
            onChange={(event) => setQuery(event.target.value)}
          />

          <button type="submit">Szukaj</button>
        </form>
      </section>

      {isLoading && <p className="message">Ładowanie...</p>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}

      {games.length > 0 && (
        <section className="results-section">
          <div className="section-header">
            <h2>Wyniki wyszukiwania</h2>
            <span>{games.length} znalezionych</span>
          </div>

          <div className="games-grid">
            {games.map((game) => (
              <GameCard key={game.rawgId} game={game} onAdd={handleAddGame} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
