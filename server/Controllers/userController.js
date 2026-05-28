import User from "../Models/User.js";
import bcrypt from "bcryptjs";

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
    res.status(200).json({ message: "Pomyślnie zalogowano" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Logowanie zakończone niepowodzeniem",
    });
  }
};

export { saveUser, loginUser };
