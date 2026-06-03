import mongoose from "mongoose";
const { Schema } = mongoose;

const gameSchema = new Schema(
  {
    rawgId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    releaseDate: {
      type: Date,
    },
    cover: {
      type: String,
    },
    rawgRating: {
      type: Number,
    },
    metacritic: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
