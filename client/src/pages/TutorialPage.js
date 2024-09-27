import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { Link, useNavigate } from "react-router-dom";
import "../style/style.css";
import VideoItem from "../component/VideoItem";

const TutorialPage = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  // eslint-disable-next-line no-unused-vars
  const { NomTutorial, nomvideo } = useParams();
  const [Tutorial, setTutorial] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      sessionStorage.setItem("error", JSON.stringify("verifie son compte"));
      navigate("/");
    }
  }, [user, navigate]);
  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/Tutorial/${NomTutorial}`
        );
        const data = await response.json();
        setTutorial(data.tutorialWithVideos);
        setVideos(data.tutorialWithVideos.videos);
        //console.log(data.tutorialWithVideos);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };
    fetchTutorial();
  }, [NomTutorial]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              className="bg-picture"
              style={{
                backgroundImage: `url("${Tutorial.imagePath}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <span className="bg-picture-overlay"></span>
              <div className="box-layout meta bottom">
                <div className="col-md-6 clearfix">
                  <div className="media-body">
                    <h1 className="text-white mb-2 m-t-10 ellipsis">
                      {Tutorial.NomTutorial}
                    </h1>
                    <h5 className="text-white">{Tutorial.description}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="w-100 py-5 d-flex flex-wrap justify-content-center align-items-center gap-4">
              {videos.map((itemV) => (
                <Link
                  key={itemV.id}
                  to={`/categories/Tutorial/${Tutorial.NomTutorial}/${itemV.nomvideo}`}
                >
                  <VideoItem video={itemV} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorialPage;
