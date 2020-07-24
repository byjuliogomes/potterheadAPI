const express = require("express");
const setup = require("./setup");

const app = express();
app.use(express.json());

setup(app);

app.listen(3000, () => {
  console.log("Houston, we have a server!");
});
