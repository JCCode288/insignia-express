const mongoose = require("mongoose");
const URI_STRING = process.env.MONGO_URI;

mongoose.connect(URI_STRING);

module.exports = mongoose;
