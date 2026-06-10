import express from "express";
import userMethods from "../Controllers/userController.js";
import verifyJWTToken from "../Middleware/jwtAuthMiddleware.js";
const routerAuth = express.Router();

routerAuth.post("/register", userMethods.saveUser);
routerAuth.post("/login", userMethods.loginUser);
routerAuth.get("/me", verifyJWTToken, userMethods.getLoggedUser);
routerAuth.get("/logout", userMethods.logoutUser);

export default routerAuth;
