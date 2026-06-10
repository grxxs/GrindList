import { Link } from "react-router-dom";

function formatDate(dateValue) {
  if (!dateValue) {
    return "Brak danych";
  }

  return String(dateValue).split("T")[0];
}

function showValue(value) {
  if (value || value === 0) {
    return value;
  }

  return "Brak danych";
}

function getStatusName(status) {
  if (status === "planned") {
    return "Planowane";
  }

  if (status === "playing") {
    return "W trakcie";
  }

  if (status === "completed") {
    return "Ukończone";
  }

  if (status === "dropped") {
    return "Porzucone";
  }

  return status;
}

function UserGameCard({ userGame, onStatusChange, onDelete }) {
  const game = userGame.gameId;

  return (
    <div className="game-card">
      {game?.cover ? (
        <img src={game.cover} alt={game.title} />
      ) : (
        <div className="cover-placeholder">Brak okładki</div>
      )}

      <div className="game-card-body">
        <div className="card-title-row">
          <h3>{game?.title || "Brak tytułu"}</h3>
          <span className={`status-label status-${userGame.status}`}>
            {getStatusName(userGame.status)}
          </span>
        </div>

        <div className="game-meta">
          <p>
            <span>Premiera</span>
            {formatDate(game?.releaseDate)}
          </p>
          <p>
            <span>RAWG</span>
            {showValue(game?.rawgRating)}
          </p>
          <p>
            <span>Metacritic</span>
            {showValue(game?.metacritic)}
          </p>
        </div>
      </div>

      <select
        value={userGame.status}
        onChange={(event) => onStatusChange(userGame._id, event.target.value)}
      >
        <option value="planned">Planowane</option>
        <option value="playing">W trakcie</option>
        <option value="completed">Ukończone</option>
        <option value="dropped">Porzucone</option>
      </select>

      <div className="card-actions">
        {game && (
          <Link
            className="secondary-button"
            to={`/games/${game.rawgId}`}
            state={{ game }}
          >
            Szczegóły
          </Link>
        )}
        <button
          type="button"
          className="danger-button"
          onClick={() => onDelete(userGame._id)}
        >
          Usuń
        </button>
      </div>
    </div>
  );
}

export default UserGameCard;
