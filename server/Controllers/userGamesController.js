import * as dotenv from "dotenv";
import UserGame from "../Models/UserGame.js";
import Game from "../Models/Game.js";
dotenv.config();

const getUserGames = async (req, res) => {
  try {
    const userId = req.userId;
    const gameList = await UserGame.find({
      userId: userId,
    }).populate("gameId");
    if (gameList.length === 0) {
      return res
        .status(200)
        .json({ gameList, message: "Brak gier do wyświetlenia" });
    }
    res.status(200).json({ gameList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Błąd podczas pobierania listy gier" });
  }
};

const addUserGame = async (req, res) => {
  try {
    const clickedGame = req.body;
    const userId = req.userId;
    if (!clickedGame.rawgId || !clickedGame.title || !clickedGame.slug) {
      return res.status(400).json({
        message: "Błąd podczas dodawania gry - brak wymaganych danych gry",
      });
    }
    const { rawgId, title, slug, releaseDate, cover, rawgRating, metacritic } =
      clickedGame;
    let gameToAdd;
    const foundGame = await Game.findOne({ rawgId: rawgId });
    if (!foundGame) {
      const newGame = new Game({
        rawgId,
        title,
        slug,
        releaseDate,
        cover,
        rawgRating,
        metacritic,
      });
      const savedGame = await newGame.save();
      gameToAdd = savedGame;
    } else {
      gameToAdd = foundGame;
    }
    const checkDuplicate = await UserGame.findOne({
      userId: userId,
      gameId: gameToAdd._id,
    });
    if (checkDuplicate) {
      return res.status(409).json({ message: "Gra została już dodana" });
    }
    const newUserGame = new UserGame({
      userId: userId,
      gameId: gameToAdd._id,
    });
    const addedGame = await newUserGame.save();
    res.status(201).json({ message: `Dodano grę ${gameToAdd.title}` });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Nastąpił nieoczekiwany błąd podczas dodawania gry" });
  }
};

const modifyUserGame = async (req, res) => {
  const allowedStatuses = ["planned", "playing", "completed", "dropped"];
  try {
    const userGameId = req.params.id;
    const userId = req.userId;
    const sentStatus = req.body.status;
    if (!sentStatus) {
      return res.status(400).json({ message: "Brak nowego statusu" });
    } else if (!allowedStatuses.includes(sentStatus)) {
      return res.status(400).json({ message: "Błędny status" });
    }
    const gameToModify = await UserGame.findOne({
      _id: userGameId,
      userId: userId,
    });
    if (!gameToModify) {
      return res.status(404).json({ message: "Nie znaleziono gry" });
    }
    if (gameToModify.status === sentStatus) {
      return res.status(409).json({ message: "Należy wybrać inny status" });
    }
    await UserGame.updateOne(
      { _id: userGameId, userId: userId },
      { status: sentStatus },
    );
    res.status(200).json({ message: "Zmieniono status" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Nastąpił błąd podczas zmiany statusu" });
  }
};

const deleteUserGame = async (req, res) => {
  try {
    const userGameId = req.params.id;
    const userId = req.userId;
    const foundGame = await UserGame.findOneAndDelete({
      _id: userGameId,
      userId: userId,
    });
    if (!foundGame) {
      return res
        .status(404)
        .json({ message: "Nie znaleziono gry do usunięcia" });
    }
    res.status(200).json({ message: "Usunięto grę z listy" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Nastąpił błąd podczas usuwania gry" });
  }
};

const userGamesMethods = {
  getUserGames,
  addUserGame,
  modifyUserGame,
  deleteUserGame,
};

export default userGamesMethods;
