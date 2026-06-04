import Game from "../Models/Game.js";
import searchRawg from "../Service/rawgService.js";
import * as dotenv from "dotenv";
dotenv.config();

const searchGame = async (req, res) => {
  const gameSearch = req.query.query;
  const regTitlePattern = /^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-:'’]+$/;
  try {
    let rawgFound = [];
    if (!gameSearch) {
      return res.status(400).json({ message: "Nie podano tytułu" });
    }
    const gameTitle = gameSearch.trim();
    if (
      gameTitle.length === 0 ||
      gameTitle.length > 50 ||
      !regTitlePattern.test(gameTitle)
    ) {
      return res.status(400).json({ message: "Błędny tytuł" });
    }
    const foundGame = await Game.find({
      title: { $regex: gameTitle, $options: "i" },
    }).limit(10);
    if (foundGame.length < 5) {
      rawgFound = await searchRawg(gameTitle);
    }
    const allGamesFound = [...foundGame, ...rawgFound];
    const seen = new Set();
    const filteredGames = allGamesFound.filter((game) => {
      if (seen.has(game.rawgId)) {
        return false;
      } else {
        seen.add(game.rawgId);
        return true;
      }
    });
    res.status(200).json({ data: filteredGames });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Błąd podczas wyszukiwania` });
  }
};

const gameMethods = {
  searchGame,
};

export default gameMethods;
