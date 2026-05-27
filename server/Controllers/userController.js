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
    res.status(400).json({
      message: `Zapis użytkownika zakończył się niepowodzeniem: ${err}`,
    });
  }
};

export default saveUser;
