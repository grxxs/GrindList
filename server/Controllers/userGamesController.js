import * as dotenv from "dotenv";
import UserGame from "../Models/UserGame.js";
import Game from "../Models/Game.js";
dotenv.config();

const getUserGames = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId == "6a16ba97b1a6b7b761563e39") {
      return res
        .status(200)
        .json({ message: "Lista użytkownika: RDR2, GTA5, CS:GO" });
    } else {
      return res.status(404).json({ message: "Nie odnaleziono użytkownika" });
    }
  } catch {
    return false;
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

const userGamesMethods = {
  getUserGames,
  addUserGame,
};

export default userGamesMethods;
