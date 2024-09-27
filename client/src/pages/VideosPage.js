import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/navbar";

import VideoItem from "../component/VideoItem";
import "../style/style.css";

const Enrehistory = async (user, video) => {
  const vue = {
    id_user: user,
    id_video: video,
  };

  try {
    const response = await fetch("http://localhost:3001/historique", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vue }),
    });

    // eslint-disable-next-line no-unused-vars
    const data = await response.json();
    //console.log(data);
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};

const EnregestreVue = async (video) => {
  const id = video;

  try {
    const response = await fetch(`http://localhost:3001/video/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // eslint-disable-next-line no-unused-vars
    const data = await response.json();
    //console.log(data);
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};

function VideosPage() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const { NomTutorial, Nomvideo } = useParams();
  const [video, setVideo] = useState({
    id: "",
    nomvideo: "",
    description: "",
    videosPath: "",
  });
  const [videos, setVideos] = useState([]);
  const [Tutorials, setTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVideos = await fetch("http://localhost:3001/video");
        const dataVideos = await responseVideos.json();
        setVideos(dataVideos.videos);
        //console.log(dataVideos.videos);

        const responseTutorials = await fetch("http://localhost:3001/Tutorial");
        const dataTutorials = await responseTutorials.json();
        setTutorials(dataTutorials.tutorialWithImage);

        const responseVideo = await fetch(
          `http://localhost:3001/Tutorial/${NomTutorial}/${Nomvideo}`
        );
        const dataVideo = await responseVideo.json();
        setVideo(dataVideo.video);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };

    fetchData();
  }, [NomTutorial, Nomvideo]);

  useEffect(() => {
    if (user && video.id) {
      EnregestreVue(video.id);
      Enrehistory(user.id, video.id);
    }
  }, [user, video.id]);

  const getTutorialNameById = (tutorialId) => {
    const tutorial = Tutorials.find((t) => t.id === tutorialId);
    return tutorial ? tutorial.NomTutorial : "";
  };

  return (
    <div>
      {user && (
        <>
          <div>
            <div className="Navbar">
              <Navbar />
            </div>
            <div className="video-page">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    {isLoading ? (
                      <div>
                        <video width="80%" height="auto"></video>
                        <div className="spinner-container">
                          <div className="spinner"></div>
                        </div>
                      </div>
                    ) : (
                      video.videosPath && (
                        <video controls width="80%" height="auto">
                          <source src={video.videosPath} type="video/mp4" />
                        </video>
                      )
                    )}
                    <div>
                      <h2>{video.nomvideo}</h2>
                      <p>{video.description}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="w-100 py-5">
                      {videos.map((itemV) => (
                        <a
                          key={itemV.id}
                          href={`/categories/Tutorial/${getTutorialNameById(
                            itemV.tutorial
                          )}/${itemV.nomvideo}`}
                        >
                          <VideoItem video={itemV} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VideosPage;
