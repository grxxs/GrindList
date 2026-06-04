import mongoose from "mongoose";
const { Schema } = mongoose;

const userGameSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  status: {
    type: String,
    enum: ["planned", "playing", "completed", "dropped"],
    default: "planned",
  },
  rating: {
    type: Number,
  },
});

userGameSchema.index({ userId: 1, gameId: 1 }, { unique: true });

const UserGame = mongoose.model("UserGame", userGameSchema);

export default UserGame;
