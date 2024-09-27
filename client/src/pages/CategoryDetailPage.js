import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { Link, useNavigate } from "react-router-dom";
import VideoItem from "../component/VideoItem";
import "../style/style.css";

const CategoryDetailPage = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const { Nomcategorie } = useParams();
  const [category, setCategory] = useState([]);
  const [tutorialsWithVideos, setTutorialsWithVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      sessionStorage.setItem("error", JSON.stringify("Vérifiez votre compte"));
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/categories/${Nomcategorie}`
        );
        const data = await response.json();
        setCategory(data.category[0]);
        setTutorialsWithVideos(data.tutorials);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };
    fetchCategories();
  }, [Nomcategorie]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div
              className="bg-picture"
              style={{
                backgroundImage: `url("${category.imagePath}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              <span className="bg-picture-overlay"></span>
              <div className="box-layout meta bottom">
                <div className="col-md-6 clearfix">
                  <div className="media-body">
                    <h1 className="text-white mb-2 m-t-10 ellipsis">
                      {category.Nomcategorie}
                    </h1>
                    <h5 className="text-white"> {category.descreption}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {tutorialsWithVideos.map(
            (item) =>
              item.videos.length > 0 && (
                <div className="col-md-12" key={item.id}>
                  <div className="self-stretch p-[60px] justify-center items-center gap-[60px] inline-flex">
                    {/* Display video below the tutorial name for small screens */}
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
                      <div className="self-stretch text-black text-[40px] font-bold font-['Roboto'] leading-[48px]">
                        {item.NomTutorial}
                      </div>
                      <div className="self-stretch text-black text-base font-normal font-['Roboto'] leading-normal">
                        {item.description}
                      </div>
                    </div>

                    {/* Display videos vertically for small screens */}
                    <div className="w-100 py-5 flex-col justify-center items-center gap-10 inline-flex d-sm-block d-md-none">
                      {item.videos.map((itemV) => (
                        <Link
                          key={itemV.id}
                          to={`/categories/Tutorial/${item.NomTutorial}/${itemV.nomvideo}`}
                        >
                          <VideoItem video={itemV} />
                        </Link>
                      ))}
                      {item.videos.length > 2 && (
                        <a href={`/categories/Tutorial/${item.NomTutorial}`}>
                          Voir plus
                        </a>
                      )}
                    </div>

                    {/* Display the first two videos horizontally for larger screens */}
                    <div className="w-100 py-5 flex-col justify-center items-center gap-10 inline-flex d-none d-md-flex">
                      {item.videos.slice(0, 2).map((itemV) => (
                        <Link
                          key={itemV.id}
                          to={`/categories/Tutorial/${item.NomTutorial}/${itemV.nomvideo}`}
                        >
                          <VideoItem video={itemV} />
                        </Link>
                      ))}
                      {item.videos.length > 2 && (
                        <a href={`/categories/Tutorial/${item.NomTutorial}`}>
                          Voir plus
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CategoryDetailPage;
