const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 5500;

const app = express();

app.get("/", (req, res) => {
  //   res.sendFile("./pages/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Running on server ${PORT}`);
});
