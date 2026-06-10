import { useEffect, useState } from "react";
import {
  getUserGames,
  updateUserGameStatus,
  deleteUserGame,
} from "../api/userGamesApi";
import UserGameCard from "../components/UserGameCard";

function Library() {
  const [userGames, setUserGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const plannedCount = userGames.filter((game) => game.status === "planned").length;
  const playingCount = userGames.filter((game) => game.status === "playing").length;
  const completedCount = userGames.filter(
    (game) => game.status === "completed",
  ).length;
  const droppedCount = userGames.filter((game) => game.status === "dropped").length;

  const loadLibrary = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const games = await getUserGames();

      setUserGames(games);

      if (games.length === 0) {
        setSuccessMessage("Brak gier w bibliotece");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserGames()
      .then((games) => {
        setUserGames(games);

        if (games.length === 0) {
          setSuccessMessage("Brak gier w bibliotece");
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleStatusChange = async (userGameId, status) => {
    try {
      await updateUserGameStatus(userGameId, status);

      setUserGames((previousGames) =>
        previousGames.map((userGame) =>
          userGame._id === userGameId ? { ...userGame, status } : userGame,
        ),
      );

      setErrorMessage("");
      setSuccessMessage("Zmieniono status");
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err.message);
    }
  };

  const handleDelete = async (userGameId) => {
    try {
      await deleteUserGame(userGameId);

      setUserGames((previousGames) =>
        previousGames.filter((userGame) => userGame._id !== userGameId),
      );

      setErrorMessage("");
      setSuccessMessage("Usunięto grę z listy");
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="library-page">
      <div className="page-title-row">
        <div>
          <p className="hero-kicker">Twoje gry</p>
          <h1>Moja biblioteka</h1>
        </div>

        <button type="button" onClick={loadLibrary}>
          Odśwież
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Łącznie</span>
          <strong>{userGames.length}</strong>
        </div>
        <div className="stat-card">
          <span>Planowane</span>
          <strong>{plannedCount}</strong>
        </div>
        <div className="stat-card">
          <span>W trakcie</span>
          <strong>{playingCount}</strong>
        </div>
        <div className="stat-card">
          <span>Ukończone</span>
          <strong>{completedCount}</strong>
        </div>
        <div className="stat-card">
          <span>Porzucone</span>
          <strong>{droppedCount}</strong>
        </div>
      </div>

      {isLoading && <p className="message">Ładowanie...</p>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}

      <div className="games-grid">
        {userGames.map((userGame) => (
          <UserGameCard
            key={userGame._id}
            userGame={userGame}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
