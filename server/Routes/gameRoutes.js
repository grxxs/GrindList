import express from "express";
import gameMethods from "../Controllers/gamesController.js";
import verifyJWTToken from "../Middleware/jwtAuthMiddleware.js";
const routerGames = express.Router();

routerGames.use(verifyJWTToken);
routerGames.get("/list", gameMethods.getUserGames);

export default routerGames;
