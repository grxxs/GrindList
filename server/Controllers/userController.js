import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const saveUser = async (req, res) => {
  const { login, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ login, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Zapis użytkownika zakończył się niepowodzeniem`,
    });
  }
};

const loginUser = async (req, res) => {
  const { login, password } = req.body;
  try {
    const foundUser = await User.findOne({ login: login });
    if (!foundUser) {
      return res.status(401).json({ message: "Nie znaleziono użytkownika" });
    }
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Błędne hasło" });
    }
    const payLoad = {
      userId: foundUser._id.toString(),
      userLogin: foundUser.login,
    };
    const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_KEY);
    res.cookie("JWT", accessToken, { httpOnly: true });
    res.status(200).json({ message: "Zalogowano" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Logowanie zakończone niepowodzeniem",
    });
  }
};

// const getCookie = async (req, res) => {
//   const cookie = req.cookies["JWT"];
//   res.status(200).json({ message: `Cookie ${cookie}` });
// };

const logoutUser = async (req, res) => {
  try {
    const cookie = req.cookies["JWT"];
    if (!cookie) {
      return res
        .status(400)
        .json({ message: "Użytkownik nie jest zalogowany" });
    }
    res.clearCookie("JWT");
    res.status(200).json({ message: "Wylogowano" });
  } catch (err) {
    res.status(500).json({
      message: `Nastąpił błąd ${err}`,
    });
  }
};

const userMethods = {
  saveUser,
  loginUser,
  // getCookie,
  logoutUser,
};

export default userMethods;
