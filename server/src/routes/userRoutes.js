const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const databaseConfig = require("../../config/database");

const pool = mysql.createPool(databaseConfig);

router.use(express.json());

router.post("/", (req, res) => {
  if (req.method === "POST") {
    const { formData, email, password } = req.body;
    if (formData) {
      pool.query(
        "INSERT INTO `user`(`NomEtPrenom`, `email`, `password`, `type`) VALUES (?,?,?,?)",
        [formData.username, formData.email, formData.password, formData.type],
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
      pool.query(
        "SELECT * FROM user WHERE email = ? AND password = ?",
        [email, password],
        (err, results) => {
          if (err) {
            console.error("Erreur lors de la requête :", err);
            res.status(500).json({ error: "Erreur serveur" });
          } else {
            if (results.length > 0) {
              res.status(200).json({ message: true, results: results });
            } else {
              res.status(404).json({ message: false });
            }
          }
        }
      );
    }
  } else {
    res.status(405).json({ error: "Méthode non autorisée" });
  }
});

module.exports = router;
