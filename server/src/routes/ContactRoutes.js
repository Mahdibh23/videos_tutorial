const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const databaseConfig = require("../../config/database");

const pool = mysql.createPool(databaseConfig);

router.use(express.json());

router.get("/", (req, res) => {
  pool.query(
    "SELECT * FROM `contact`",
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la requête :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.status(200).json({ message: results });
      }
    }
  );
});

router.post("/", (req, res) => {
  const { nom, email, message } = req.body;
  
  if (nom && email && message) {
    pool.query(
      "INSERT INTO `contact`(`nom`, `email`, `message`) VALUES (?,?,?)",
      [nom, email, message],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la requête :", err);
          res.status(500).json({ error: "Erreur serveur" });
        } else {
          res.status(200).json({ message: true });
        }
      }
    );
  } else {
    res.status(400).json({ error: "Les champs nom, email et message sont requis" });
  }
});

module.exports = router;
