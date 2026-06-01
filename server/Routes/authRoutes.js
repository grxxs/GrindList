import express from "express";
import {
  saveUser,
  loginUser,
  getCookie,
} from "../Controllers/userController.js";
const router = express.Router();

router.post("/register", (req, res) => {
  saveUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

router.get("/test", (req, res) => {
  getCookie(req, res);
});

export default router;
