require("dotenv").config();
const mongoose = require("mongoose");
const URI_STRING = process.env.MONGO_URI ?? "mongodb://localhost:27017/";

mongoose.connect(URI_STRING);

module.exports = mongoose;
