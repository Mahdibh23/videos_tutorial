const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const databaseConfig = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const userRoutes = require("./src/routes/userRoutes");
app.use("/user", userRoutes);

const categoriesRoutes = require("./src/routes/categorieRoutes");
app.use("/categories", categoriesRoutes);

const TutorialRoutes = require("./src/routes/TutorialRoutes.js");
app.use("/Tutorial", TutorialRoutes);

const historiqueRoutes = require("./src/routes/historiqueRoutes.js");
app.use("/historique", historiqueRoutes);

const Contact = require("./src/routes/ContactRoutes.js");
app.use("/contact", Contact);

const Video = require("./src/routes/VideoRoutes.js");
app.use("/video", Video);

app.listen(PORT, () => {
  console.log("Serveur en ligne sur le port", PORT);
});
