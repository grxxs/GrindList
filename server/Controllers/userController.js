import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const accessTokenExpiresIn = "1h";
const authCookieMaxAge = 60 * 60 * 1000;
const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

const saveUser = async (req, res) => {
  try {
    let { login, email, password } = req.body;

    if (!login || !email || !password) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane" });
    }

    login = login.trim();
    email = email.trim().toLowerCase();

    if (login.length < 5 || login.length > 30) {
      return res
        .status(400)
        .json({ message: "Nazwa użytkownika musi mieć od 5 do 30 znaków" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Niepoprawny adres e-mail" });
    }

    if (password.length < 9) {
      return res
        .status(400)
        .json({ message: "Hasło musi mieć minimum 9 znaków" });
    }

    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Hasło musi zawierać dużą literę i cyfrę" });
    }

    const foundUser = await User.findOne({
      $or: [{ login: login }, { email: email }],
    });

    if (foundUser) {
      return res.status(409).json({
        message: "Użytkownik o takiej nazwie lub adresie e-mail już istnieje",
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
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res
        .status(400)
        .json({ message: "Nazwa użytkownika i hasło są wymagane" });
    }

    const trimmedLogin = login.trim();

    if (!trimmedLogin) {
      return res
        .status(400)
        .json({ message: "Nazwa użytkownika jest wymagana" });
    }

    const foundUser = await User.findOne({ login: trimmedLogin });
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
    const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: accessTokenExpiresIn,
    });
    res.cookie("JWT", accessToken, {
      ...authCookieOptions,
      maxAge: authCookieMaxAge,
    });
    res.status(200).json({ message: "Zalogowano" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Logowanie zakończone niepowodzeniem",
    });
  }
};

const getLoggedUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.userId).select("-password");

    if (!foundUser) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });
    }

    res.status(200).json({
      user: {
        id: foundUser._id,
        login: foundUser.login,
        email: foundUser.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Błąd podczas pobierania użytkownika",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const cookie = req.cookies["JWT"];
    if (!cookie) {
      return res
        .status(400)
        .json({ message: "Użytkownik nie jest zalogowany" });
    }
    res.clearCookie("JWT", authCookieOptions);
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
  getLoggedUser,
  logoutUser,
};

export default userMethods;
