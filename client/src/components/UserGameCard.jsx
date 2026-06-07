function UserGameCard({ userGame, onStatusChange, onDelete }) {
  const game = userGame.gameId;

  return (
    <div>
      {game?.cover && <img src={game.cover} alt={game.title} width="120" />}

      <h3>{game?.title}</h3>

      <p>Status: {userGame.status}</p>
      <p>Premiera: {game?.releaseDate || "Brak danych"}</p>
      <p>RAWG rating: {game?.rawgRating || "Brak danych"}</p>
      <p>Metacritic: {game?.metacritic || "Brak danych"}</p>

      <select
        value={userGame.status}
        onChange={(event) => onStatusChange(userGame._id, event.target.value)}
      >
        <option value="planned">Planned</option>
        <option value="playing">Playing</option>
        <option value="completed">Completed</option>
        <option value="dropped">Dropped</option>
      </select>

      <button onClick={() => onDelete(userGame._id)}>Usuń</button>

      <hr />
    </div>
  );
}

export default UserGameCard;
