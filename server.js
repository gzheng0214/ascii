const express = require("express");
const app = express();
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
app.use(express.json());
const PORT = process.env.PORT || 3000;

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

nextApp
  .prepare()
  .then(() => {
    app.all("*", (req, res) => handle(req, res));
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
