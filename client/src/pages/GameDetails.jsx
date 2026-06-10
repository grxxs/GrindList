import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { addUserGame } from "../api/userGamesApi";

function formatDate(dateValue) {
  if (!dateValue) {
    return "Brak danych";
  }

  return String(dateValue).split("T")[0];
}

function getRatingPercent(value, maxValue) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return Math.round((numberValue / maxValue) * 100);
}

function getRatingClass(percent) {
  if (percent === null) {
    return "rating-empty";
  }

  if (percent < 20) {
    return "rating-red";
  }

  if (percent < 50) {
    return "rating-orange";
  }

  if (percent < 65) {
    return "rating-yellow";
  }

  return "rating-green";
}

function GameDetails() {
  const location = useLocation();
  const game = location.state?.game;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddGame = async () => {
    try {
      const data = await addUserGame(game);
      setErrorMessage("");
      setSuccessMessage(data.message || "Dodano grę do listy");
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err.message);
    }
  };

  if (!game) {
    return (
      <div className="details-page">
        <p className="message error">
          Brak danych gry. Wróć do wyszukiwarki lub biblioteki.
        </p>
        <Link className="secondary-button" to="/">
          Wróć do wyszukiwarki
        </Link>
      </div>
    );
  }

  const rawgPercent = getRatingPercent(game.rawgRating, 5);
  const metacriticPercent = getRatingPercent(game.metacritic, 100);

  return (
    <div className="details-page">
      <div className="details-header">
        <p className="hero-kicker">Szczegóły gry</p>
        <h1>{game.title}</h1>
      </div>

      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}

      <div className="details-layout">
        {game.cover ? (
          <img className="details-cover" src={game.cover} alt={game.title} />
        ) : (
          <div className="details-cover cover-placeholder">Brak okładki</div>
        )}

        <div className="details-info">
          <div className="details-row">
            <span>Data premiery</span>
            <strong>{formatDate(game.releaseDate)}</strong>
          </div>

          <div className="rating-list">
            <div className={`rating-badge ${getRatingClass(rawgPercent)}`}>
              <span>RAWG</span>
              <strong>
                {rawgPercent === null ? "Brak danych" : `${game.rawgRating}/5`}
              </strong>
              {rawgPercent !== null && <small>{rawgPercent}%</small>}
            </div>

            <div className={`rating-badge ${getRatingClass(metacriticPercent)}`}>
              <span>Metacritic</span>
              <strong>
                {metacriticPercent === null
                  ? "Brak danych"
                  : `${game.metacritic}/100`}
              </strong>
              {metacriticPercent !== null && <small>{metacriticPercent}%</small>}
            </div>
          </div>

          <div className="card-actions">
            <button type="button" onClick={handleAddGame}>
              Dodaj do listy
            </button>
            <Link className="secondary-button" to="/">
              Wróć
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
