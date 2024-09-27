const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const databaseConfig = require("../../config/database");

const pool = mysql.createPool(databaseConfig);

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { vue, user, history } = req.body;

    if (history) {
      const videos = [];
      let count = 0;

      for (const video of history) {
        const query = "SELECT * FROM videos WHERE id = ?";
        const result = await queryAsync(pool, query, [video.id]);

        count++;

        if (result.err) {
          console.error("Erreur lors de la requête :", result.err);
          return res.status(500).json({ error: "Erreur serveur" });
        }
        if (result.results.length > 0) {
          videos.push({
            id: video.id,
            title: result.results[0].nomvideo,
            description: result.results[0].description,
            tutorial: result.results[0].tutorial,
            imagePath: `data:image/png;base64,${Buffer.from(result.results[0].FirstFrame).toString("base64")}`,
          });
        }

        if (count === history.length) {
          return res.status(200).json({ videos: videos });
        }
      }
    } else if (vue) {
      const query = "INSERT INTO `historique` SET `ID-user` = ?, `ID-video` = ?";
      const values = [vue.id_user, vue.id_video];
      await queryAsync(pool, query, values);

      res.cookie("VISITOR_PRIVACY_METADATA", vue.id_user, {
        sameSite: "None",
        secure: true,
      });

      res.status(200).json({ message: true });
    } else if (user) {
      const query =
        "SELECT DISTINCT `ID-video` AS id FROM `historique` WHERE `ID-user` = ? ";
      const result = await queryAsync(pool, query, [user.id]);

      if (result.err) {
        console.error("Erreur lors de la requête :", result.err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (result.results.length >= 0) {
        res.status(200).json({ message: true, historique: result.results });
      } else {
        res.status(404).json({ message: false });
      }
    } else {
      res.status(400).json({ error: "Les données fournies ne sont pas valides." });
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Fonction pour exécuter une requête MySQL et retourner une promesse
function queryAsync(pool, query, values) {
  return new Promise((resolve) => {
    pool.query(query, values, (err, results) => {
      resolve({ err, results });
    });
  });
}

module.exports = router;
