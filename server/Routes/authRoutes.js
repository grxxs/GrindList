import express from "express";
import saveUser from "../Controllers/userController.js";
const router = express.Router();

router.post("/", (req, res) => {
  saveUser(req, res);
});

export default router;
