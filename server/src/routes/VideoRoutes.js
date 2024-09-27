const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const databaseConfig = require("../../config/database");
const pool = mysql.createPool(databaseConfig);
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const VIDEO_COLUMNS = [
  "nomvideo",
  "description",
  "tutorial",
  "video",
  "FirstFrameImage",
];
const getFirstFrameImage = async (videoBuffer) => {
  return new Promise((resolve, reject) => {

    const tempVideoDir ="src/routes/videos"; 
    fs.mkdirSync(tempVideoDir, { recursive: true });

    const tempVideoPath = path.join(tempVideoDir, "tempVideo.mp4");

    fs.writeFile(tempVideoPath, videoBuffer, async (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier temporaire :", err);
        reject(err);
        return;
      }
      try {
        await ffmpeg()
          .input(tempVideoPath)
          .on("end", () => {
            fs.readFile(tempVideoPath + ".jpg", (err, data) => {
              if (err) {
                console.error("Erreur lors de la lecture de l'image :", err);
                reject(err);
              } else {
                const base64Image = Buffer.from(data).toString("base64");
                resolve(base64Image);
              }
            });
          })
          .on("error", (err) => {
            console.error("Erreur lors de l'extraction de la miniature :", err);
            reject(err);
          })
          .outputOptions(["-frames:v 1"])
          .output(tempVideoPath + ".jpg")
          .run();
      } catch (err) {
        reject(err);
      }
    });
  });
};

router.get("/", (req, res) => {
  pool.query("SELECT * FROM `videos`", async (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err);
      res.status(500).json({ error: "Erreur serveur" });
    } else {
      const videos = await Promise.all(
        results.map(async (video) => {
          const base64Image = Buffer.from(video.FirstFrame).toString("base64");
          video.imagePath = `data:image/png;base64,${base64Image}`;
          return video;
        })
      );
      res.status(200).json({ videos: videos });
    }
  });
});

router.post("/", upload.single("video"), async (req, res) => {
  const { nomvideo, description, tutorial } = req.body;

  if (!(nomvideo && description && tutorial && req.file)) {
    return res.status(400).json({
      error: "Les champs nomvideo, description, tutorial et video sont requis",
    });
  }

  try {
    const firstFrameImage = await getFirstFrameImage(req.file.buffer);
    const videoBuffer = req.file.buffer;

    const firstFrameBuffer = Buffer.from(firstFrameImage, "base64");

    pool.query(
      "INSERT INTO videos( nomvideo, description, tutorial, video, FirstFrame) VALUES (?, ?, ?, ?, ?)",
      [nomvideo, description, tutorial, videoBuffer, firstFrameBuffer],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la requête :", err);
          res.status(500).json({ error: "Erreur serveur" });
        } else {
          res.status(200).json({ message: true });
        }
      }
    );
  } catch (error) {
    console.error("Erreur lors du traitement de la vidéo :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;

  pool.query(
    "UPDATE `videos` SET `nbvue` = `nbvue` + 1 WHERE `id` = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la requête :", err);
        res.status(500).json({ error: "Erreur serveur" });
      } else {
        res.status(200).json({ message: true });
      }
    }
  );
});

module.exports = router;
