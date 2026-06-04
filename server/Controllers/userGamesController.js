import * as dotenv from "dotenv";
dotenv.config();

const getUserGames = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId == "6a16ba97b1a6b7b761563e39") {
      return res
        .status(200)
        .json({ message: "Lista użytkownika: RDR2, GTA5, CS:GO" });
    } else {
      return res.status(404).json({ message: "Nie odnaleziono użytkownika" });
    }
  } catch {
    return false;
  }
};

const userGamesMethods = {
  getUserGames,
};

export default userGamesMethods;
