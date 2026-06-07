import express from "express";
import userGamesMethods from "../Controllers/userGamesController.js";
import verifyJWTToken from "../Middleware/jwtAuthMiddleware.js";
const routerUserGames = express.Router();

routerUserGames.use(verifyJWTToken);
routerUserGames.get("/", userGamesMethods.getUserGames);
routerUserGames.post("/", userGamesMethods.addUserGame);
routerUserGames.put("/:id", userGamesMethods.modifyUserGame);
routerUserGames.delete("/:id", userGamesMethods.deleteUserGame);

export default routerUserGames;
