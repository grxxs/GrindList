import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./Database/db.js";
import routerAuth from "./Routes/authRoutes.js";
import routerUserGames from "./Routes/userGameRoutes.js";
import routerGames from "./Routes/gameRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/auth", routerAuth);
app.use("/user-games", routerUserGames);
app.use("/games", routerGames);

app.get("/", (req, res) => {
  res.send("Hi");
});

dbConnect();

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
