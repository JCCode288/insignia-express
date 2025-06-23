const mongoose = require("../database");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, index: true, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  UserSchema,
};
