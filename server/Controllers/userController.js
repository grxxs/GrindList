import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const saveUser = async (req, res) => {
  try {
    let { login, email, password } = req.body;

    if (!login || !email || !password) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane" });
    }

    login = login.trim();
    email = email.trim().toLowerCase();

    if (login.length < 3 || login.length > 30) {
      return res
        .status(400)
        .json({ message: "Login musi mieć od 3 do 30 znaków" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Hasło musi mieć minimum 6 znaków" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Niepoprawny adres email" });
    }

    const foundUser = await User.findOne({
      $or: [{ login: login }, { email: email }],
    });

    if (foundUser) {
      return res.status(409).json({
        message: "Użytkownik o takim loginie lub emailu już istnieje",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      login,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "Użytkownik został zarejestrowany",
      user: {
        id: savedUser._id,
        login: savedUser.login,
        email: savedUser.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Zapis użytkownika zakończył się niepowodzeniem",
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
    console.log(err);
    res.status(500).json({
      message: `Nastąpił błąd`,
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
