import express from "express";
import userMethods from "../Controllers/userController.js";
const routerAuth = express.Router();

routerAuth.post("/register", userMethods.saveUser);
routerAuth.post("/login", userMethods.loginUser);
routerAuth.get("/test", userMethods.getCookie);
routerAuth.get("/logout", userMethods.logoutUser);

export default routerAuth;
