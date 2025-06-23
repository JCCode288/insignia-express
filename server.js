require("dotenv").config();

const app = require("./src/app");
const PORT = +(process.env.PORT ?? "3000");

app.listen(PORT, (err) => {
  if (err) return console.error(err);

  console.log(`listening to http://0.0.0.0:${PORT}`);
});
