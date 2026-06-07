import { useEffect, useState } from "react";
import {
  getUserGames,
  updateUserGameStatus,
  deleteUserGame,
} from "../api/userGamesApi";
import UserGameCard from "../components/UserGameCard";

function Library() {
  const [userGames, setUserGames] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadLibrary = async () => {
    try {
      setIsLoading(true);
      setMessage("");

      const games = await getUserGames();

      setUserGames(games);

      if (games.length === 0) {
        setMessage("Brak gier w bibliotece");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  const handleStatusChange = async (userGameId, status) => {
    try {
      await updateUserGameStatus(userGameId, status);

      setUserGames((previousGames) =>
        previousGames.map((userGame) =>
          userGame._id === userGameId ? { ...userGame, status } : userGame,
        ),
      );

      setMessage("Zmieniono status");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDelete = async (userGameId) => {
    try {
      await deleteUserGame(userGameId);

      setUserGames((previousGames) =>
        previousGames.filter((userGame) => userGame._id !== userGameId),
      );

      setMessage("Usunięto grę z listy");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h1>Moja biblioteka</h1>

      <button onClick={loadLibrary}>Odśwież</button>

      {isLoading && <p>Ładowanie...</p>}
      {message && <p>{message}</p>}

      <div>
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
