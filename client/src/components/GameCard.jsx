function GameCard({ game, onAdd }) {
  return (
    <div>
      {game.cover && <img src={game.cover} alt={game.title} width="120" />}

      <h3>{game.title}</h3>

      <p>Premiera: {game.releaseDate || "Brak danych"}</p>
      <p>RAWG rating: {game.rawgRating || "Brak danych"}</p>
      <p>Metacritic: {game.metacritic || "Brak danych"}</p>

      <button onClick={() => onAdd(game)}>Dodaj do listy</button>

      <hr />
    </div>
  );
}

export default GameCard;
