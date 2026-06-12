import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Podaj poprawny adres e-mail"],
  },
  password: {
    type: String,
    required: true,
    minlength: 9,
    match: [/^(?=.*[A-Z])(?=.*\d)/, "Hasło musi zawierać dużą literę i cyfrę"],
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
