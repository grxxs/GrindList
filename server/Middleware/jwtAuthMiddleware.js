import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const verifyJWTToken = async (req, res, next) => {
  try {
    const cookie = req.cookies["JWT"];
    if (!cookie) {
      return res
        .status(401)
        .json({ message: "Musisz się zalogować, aby wykonać tę akcję" });
    }
    const jwtToken = jwt.verify(cookie, process.env.ACCESS_TOKEN_KEY);
    req.userId = jwtToken.userId;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ message: "Sesja wygasła. Zaloguj się ponownie" });
  }
};

export default verifyJWTToken;
