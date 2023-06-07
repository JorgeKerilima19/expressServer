const path = require("path");
const express = require("express");
const cors = require("cors");
const { callbackify } = require("util");

const PORT = process.env.PORT || 5500;

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

const allowedList = [
  "http://www.google.com",
  "http://www.mysite.com",
  "http://127.0.0.1:5500",
  "http://localhost:5500",
];

const corsOption = {
  origin: (origin, callback) => {
    if (allowedList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

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

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Running on server ${PORT}`);
});
