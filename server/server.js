import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./Database/db.js";
import router from "./Routes/authRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/register", router);

app.get("/", (req, res) => {
  res.send("Hi");
});

dbConnect();

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
