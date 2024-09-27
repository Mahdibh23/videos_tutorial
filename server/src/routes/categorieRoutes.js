const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const databaseConfig = require("../../config/database");


const pool = mysql.createPool(databaseConfig);

router.use(express.json());

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:Nomcategorie?", async (req, res) => {
  const Nomcategorie = req.params.Nomcategorie;
  if (Nomcategorie) {
    try {
      const categoryData = await fetchCategory(Nomcategorie);
      const tutorials = await fetchTutorialsForCategory(Nomcategorie);

      const categoryDataWithImage = categoryData.map((category) => {
        const base64Image = Buffer.from(category.image).toString('base64');
        category.imagePath = `data:image/png;base64,${base64Image}`;
        return category;
      });
      const tutorialsWithImages = await Promise.all(
        tutorials.map(async (tutorial) => {
          const videos = await fetchVideosForTutorial(tutorial.id);
          tutorial.videos = videos;

          const base64Image = Buffer.from(tutorial.image).toString('base64');
          tutorial.imagePath = `data:image/png;base64,${base64Image}`;

          return tutorial;
        })
      );
      res.status(200).json({ category: categoryDataWithImage, tutorials: tutorialsWithImages });
    } catch (error) {
      console.error("Error fetching tutorials:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    try {
      const categories = await fetchAllCategories();
      const categoriesWithImages = await Promise.all(
        categories.map(async (category) => {
          const base64Image = Buffer.from(category.image).toString('base64');
          category.imagePath = `data:image/png;base64,${base64Image}`;
          return category;
        })
      );
      res.status(200).json({ categories: categoriesWithImages });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

async function fetchAllCategories() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM categories", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function fetchCategory(Nomcategorie) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM categories WHERE Nomcategorie = ?",
      [Nomcategorie],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

async function fetchTutorialsForCategory(Nomcategorie) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM tutorials WHERE categorie = (SELECT id FROM categories WHERE Nomcategorie = ? LIMIT 1)",
      [Nomcategorie],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

async function fetchVideosForTutorial(tutorialId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM videos WHERE tutorial = ?",
      [tutorialId],
      async (err, results) => {
        if (err) {
          reject(err);
        } else {
            const videos = await Promise.all(
              results.map(async (video) => {
                if (video.FirstFrame) {
                  const base64Image = Buffer.from(video.FirstFrame).toString(
                    "base64"
                  );
                  video.imagePath = `data:image/png;base64,${base64Image}`;
                }
                return video;
              })
            );
          resolve(videos);
        }
      }
    );
  });
}

router.post("/", upload.single('image'), (req, res) => {
  const { Nomcategorie, descreption } = req.body;

  if (Nomcategorie && descreption && req.file) {
    pool.query(
      "INSERT INTO `categories`(`Nomcategorie`, `descreption`, `image`) VALUES (?, ?, ?)",
      [Nomcategorie, descreption, req.file.buffer],
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
