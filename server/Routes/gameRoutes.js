import express from "express";
import gameMethods from "../Controllers/gamesController.js";
const routerGames = express.Router();

routerGames.get("/search", gameMethods.searchGame);

export default routerGames;
