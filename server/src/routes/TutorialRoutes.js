const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const databaseConfig = require("../../config/database");
const fs = require("fs");
const path = require("path");
const pool = mysql.createPool(databaseConfig);

router.use(express.json());

router.use("/videos", express.static(path.join(__dirname, "videos")));

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:NomTutorial?/:nomvideo?", async (req, res) => {
  const { NomTutorial, nomvideo } = req.params;

  try {
    if (nomvideo) {
      const video = await fetchVideos(nomvideo);

      if (!video || video.length === 0) {
        return res.status(404).json({ error: "Vidéo non trouvée" });
      }

      const base64Video = Buffer.from(video[0].video).toString("base64");
      const videoDataUrl = `data:video/mp4;base64,${base64Video}`;
      video[0].videosPath = videoDataUrl;

      res.status(200).json({ video: video[0] });
    } else if (NomTutorial) {
      const tutorialWithVideos = await fetchTutorialByName(NomTutorial);

      if (!tutorialWithVideos) {
        res.status(404).json({ error: "Tutorial non trouvé" });
        return;
      }

      const videos = await fetchVideosTutorial(tutorialWithVideos.id);

      tutorialWithVideos.videos = videos;
      const base64Image = Buffer.from(tutorialWithVideos.image).toString(
        "base64"
      );
      tutorialWithVideos.imagePath = `data:image/png;base64,${base64Image}`;

      res.status(200).json({ tutorialWithVideos });
    } else {
      const tutorials = await fetchTutorials();
      const tutorialWithImage = await Promise.all(
        tutorials.map(async (tutorial) => {
          const base64Image = Buffer.from(tutorial.image).toString("base64");
          tutorial.imagePath = `data:image/png;base64,${base64Image}`;
          return tutorial;
        })
      );

      res.status(200).json({ tutorialWithImage });
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

async function fetchTutorialByName(NomTutorial) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM tutorials WHERE NomTutorial = ?",
      [NomTutorial],
      (err, tutorials) => {
        if (err) {
          reject(err);
        } else {
          resolve(tutorials[0]);
        }
      }
    );
  });
}

async function fetchVideosTutorial(tutorialId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM videos WHERE tutorial = ?",
      [tutorialId],
      async (err, results) => {
        if (err) {
          reject(err);
        } else {
          try {
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
          } catch (error) {
            reject(error);
          }
        }
      }
    );
  });
}


async function fetchVideos(nomvideo) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM videos WHERE nomvideo = ?",
      [nomvideo],
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

async function fetchTutorials() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM tutorials", (err, tutorials) => {
      if (err) {
        reject(err);
      } else {
        resolve(tutorials);
      }
    });
  });
}

router.post("/", upload.single("image"), (req, res) => {
  const { NomTutorial, descreption, category } = req.body;

  if (NomTutorial && descreption && category && req.file) {
    pool.query(
      "INSERT INTO `tutorials`(`NomTutorial`, `description`, `categorie`, `image`) VALUES (?,?,?,?)",
      [NomTutorial, descreption, category, req.file.buffer],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la requête :", err);
          res.status(500).json({ message: false });
        } else {
          res.status(200).json({ message: true });
        }
      }
    );
  } else {
    res.status(400).json({ message: false });
  }
});

module.exports = router;
