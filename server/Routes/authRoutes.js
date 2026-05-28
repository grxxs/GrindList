import express from "express";
import { saveUser, loginUser } from "../Controllers/userController.js";
const router = express.Router();

router.post("/register", (req, res) => {
  saveUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

export default router;
