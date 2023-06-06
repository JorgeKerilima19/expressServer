const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 5500;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|/index(.html)?", (req, res) => {
  //   res.sendFile("./pages/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});
app.get("/mainPage(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "mainPage.html"));
});

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("hello requested");
    next();
  },
  (req, res) => {
    res.send("Hello Loaded");
  }
);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "pages", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Running on server ${PORT}`);
});
