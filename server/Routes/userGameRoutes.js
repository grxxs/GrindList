import express from "express";
import userGamesMethods from "../Controllers/userGamesController.js";
import verifyJWTToken from "../Middleware/jwtAuthMiddleware.js";
const routerUserGames = express.Router();

routerUserGames.use(verifyJWTToken);
routerUserGames.get("/list", userGamesMethods.getUserGames);

export default routerUserGames;
