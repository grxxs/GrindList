import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const verifyJWTToken = async (req, res, next) => {
  try {
    const cookie = req.cookies["JWT"];
    if (!cookie) {
      return res.status(401).json({ message: "Nie odnaleziono cookie" });
    }
    const jwtToken = jwt.verify(cookie, process.env.ACCESS_TOKEN_KEY);
    req.userId = jwtToken.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: `Nieprawidłowy lub wygasły token` });
  }
};

export default verifyJWTToken;
