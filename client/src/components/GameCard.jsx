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

function GameCard({ game, onAdd }) {
  return (
    <div className="game-card">
      {game.cover ? (
        <img src={game.cover} alt={game.title} />
      ) : (
        <div className="cover-placeholder">Brak okładki</div>
      )}

      <div className="game-card-body">
        <h3>{game.title}</h3>

        <div className="game-meta">
          <p>
            <span>Premiera</span>
            {formatDate(game.releaseDate)}
          </p>
          <p>
            <span>RAWG</span>
            {showValue(game.rawgRating)}
          </p>
          <p>
            <span>Metacritic</span>
            {showValue(game.metacritic)}
          </p>
        </div>
      </div>

      <div className="card-actions">
        <Link
          className="secondary-button"
          to={`/games/${game.rawgId}`}
          state={{ game }}
        >
          Szczegóły
        </Link>
        <button type="button" onClick={() => onAdd(game)}>
          Dodaj do listy
        </button>
      </div>
    </div>
  );
}

export default GameCard;
