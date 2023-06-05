const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 5500;

const app = express();

app.get("^/$|/index(.html)?", (req, res) => {
  //   res.sendFile("./pages/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});
app.get("/mainPage(.html)?", (req, res) => {
  //   res.sendFile("./pages/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "pages", "mainPage.html"));
});
app.get("/*(.html)?", (req, res) => {
  //   res.sendFile("./pages/index.html", { root: __dirname });
  res.status(404).sendFile(path.join(__dirname,"pages","404.html"));
});

app.listen(PORT, () => {
  console.log(`Running on server ${PORT}`);
});
