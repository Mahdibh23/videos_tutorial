/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";


import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/style.css";
import VideoItem from "../component/VideoItem";

const Signe = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState([]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results);
        if (data.message === false) {
          setErrorMessage("Il n'y a pas de compte avec ces informations.");
        } else {
          sessionStorage.setItem("user", JSON.stringify(data.results[0]));
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  return (
    <form method="post" className="form-box text-center">
      <h3 className="h4 text-black mb-4">Connection</h3>
      <div className="form-group">
        <input
          type="text"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={handleEmailChange}
          className="form-control"
          placeholder="Email Address"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <input
          type="button"
          onClick={handleSignIn}
          className="btn btn-pill btn-light-blue"
          value="Sign up"
        />
      </div>
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
    </form>
  );
};

const Contact = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const Envoyer = () => {
    fetch("http://localhost:3001/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom, email, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const Effacer = () => {
    setEmail("");
    setNom("");
    setMessage("");
  };

  return (
    <div className="self-stretch overflow-hidden flex flex-row items-center justify-center py-[60px] px-[170px] relative gap-[60px] z-[8] text-sm">
      <div className="flex-1 flex flex-col items-center justify-start gap-[24px] z-[0]">
        <b className="relative text-21xl leading-[48px] inline-block text-center w-[520px]">
          Contactez-nous
        </b>
        <div className="w-[600px] overflow-hidden flex flex-col items-start justify-center gap-[4px]">
          <div className="self-stretch relative leading-[20px] font-medium">
            Nom
          </div>
          <input
            type="text"
            name="nom"
            onChange={handleNomChange}
            value={nom}
            placeholder="votre nom"
            className="self-stretch rounded-md bg-white flex flex-row items-center justify-start py-2 px-3 text-gray-400 border-[1px] border-solid border-gray-500"
          />
        </div>
        <div className="w-[600px] overflow-hidden flex flex-col items-start justify-center gap-[4px]">
          <div className="self-stretch relative leading-[20px] font-medium">
            Email
          </div>
          <input
            type="email"
            name="email"
            onChange={handleEmailChange}
            value={email}
            placeholder="votre email."
            className="self-stretch rounded-md bg-white flex flex-row items-center justify-start py-2 px-3 text-gray-400 border-[1px] border-solid border-gray-500"
          />
        </div>
        <div className="w-[600px] overflow-hidden flex flex-col items-start justify-center gap-[4px]">
          <div className="self-stretch relative leading-[20px] font-medium">
            Message
          </div>
          <textarea
            className="self-stretch rounded-md bg-white flex flex-row items-center justify-start py-2 px-3 text-gray-400 border-[1px] border-solid border-gray-500"
            name="message"
            rows="4"
            cols="50"
            value={message}
            onChange={handleMessageChange}
            placeholder="votre message."
          />
        </div>
        <div className="overflow-hidden flex flex-row items-start justify-start gap-[12px] text-base">
          <input
            type="button"
            value="Effacer"
            onClick={Effacer}
            className="rounded-lg box-border w-40 flex flex-col items-center justify-center p-3 border-[1px] border-solid border-black"
          />
          <input
            type="button"
            value="Envoyer"
            onClick={Envoyer}
            className="rounded-lg box-border w-40 flex flex-col items-center justify-center p-3 border-[1px] border-solid border-black"
          />
        </div>
      </div>
    </div>
  );
};

const PopuVideos = () => {
  const [videos, setVideos] = useState([]);
  const [Tutorials, setTutorials] = useState([]);
  const [videosTrie, setVideosTrie] = useState([]);

  useEffect(() => {
    const fetchvideos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/video`, {
          timeout: 10000,
        });
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchTutorials = async () => {
      try {
        const response = await fetch("http://localhost:3001/Tutorial", {
          timeout: 10000,
        });
        const data = await response.json();
        setTutorials(data.tutorialWithImage);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorials();
    fetchvideos();
  }, []); 

  useEffect(() => {
    const sortByNbVueDesc = () => {
      const sortedVideos = [...videos].sort((a, b) => b.nbvue - a.nbvue);
      setVideosTrie(sortedVideos);
    };

    sortByNbVueDesc();
  }, [videos]);

  const getTutorialNameById = (tutorialId) => {
    const tutorial = Tutorials.find((t) => t.id === tutorialId);
    return tutorial ? tutorial.NomTutorial : "";
  };

  return (
    <>
      <div className="page_section">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section_title text-center">
                <h1>Populaire Vidéos</h1>
              </div>
            </div>
          </div>

          <div className="row course_boxes">
            {videosTrie.slice(0, 3).map((video) => (
              <div key={video.id} className="col-md-4 mb-4">
                <a
                  className="btn-pill"
                  href={`/categories/Tutorial/${getTutorialNameById(
                    video.tutorial
                  )}/${video.nomvideo}`}
                >
                  <VideoItem video={video} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const CustomPrevArrow = ({ onClick }) => (
  <div onClick={onClick} className="slick-prev">
    <SlArrowLeftCircle />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div onClick={onClick} className="slick-next">
    <SlArrowRightCircle />
  </div>
);

const HomePage = () => {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [Categories, setCategories] = useState([]);
  const [Tutorials, setTutorials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredTutorials, setFilteredTutorials] = useState(Tutorials);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories", {
          timeout: 10000,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    const fetchTutorials = async () => {
      try {
        const response = await fetch("http://localhost:3001/Tutorial", {
          timeout: 10000,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTutorials(data.tutorialWithImage);
      } catch (error) {
        console.error("Error fetching tutorials:", error.message);
      }
    };

    fetchTutorials();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === 0) {
      setFilteredTutorials(Tutorials);
    } else {
      const filtered = Tutorials.filter(
        (tutorial) => tutorial.categorie === selectedCategory
      );
      setFilteredTutorials(filtered);
    }
  }, [selectedCategory, Tutorials]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 9999,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          margin: 20,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          margin: 30,
          prevArrow: <CustomPrevArrow />,
          nextArrow: <CustomNextArrow />,
        },
      },
    ],
  };

  return (
    <>
      {userString ? (
        <>
          <Navbar />
          <section className="intro-section" id="home-section">
            <div className="slide-1" data-stellar-background-ratio="0.5">
              <div className="container">
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-6 mb-4 text-center">
                    <p className="mb-4">
                      Agence 360 spécialistes de la restauration,Makseb vous
                      accompagne dans la mise en place de vos caisses
                      enregistreuse tactile, vos packagings personnalisés,votre
                      graphisme,votre décoration intérieure. Bref: si vous avez
                      un projet,nous avons la solution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="Categories-section">
            <div>
              <div className="site-section courses-title" id="courses-section">
                <div className="container">
                  <div className="row mb-5 justify-content-center">
                    <div className="col-lg-7 text-center">
                      <h2 className="section-title">Catégories</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="site-section courses-entry-wrap">
                <div className="container">
                  <div style={{ padding: "0 30px" }}>
                    <Slider {...settings}>
                      {Categories.map((category) => (
                        <div
                          className="List w-full md:w-96 h-96 py-5 justify-center items-center gap-10 inline-flex"
                          style={{ paddingRight: "15px" }}
                          key={category.id}
                        >
                          <div className="course bg-white h-100 md:h-auto md:mr-4 md:ml-4 valign-self-stretch text-center">
                            <figure className="m-0 h-[180px] md:w-[300px]">
                              <img
                                src={category.imagePath}
                                alt=""
                                className="img-fluid ml-4"
                              />
                            </figure>
                            <a href={`categories/${category.Nomcategorie}`}>
                              <div className="course-inner-text py-4 px-4">
                                <h3>{category.Nomcategorie}</h3>
                                <p>{category.descreption}</p>
                              </div>
                            </a>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="Tutorial-section">
            <div className="container">
              <div className="section-title mb-0">
                <h2>Tutorial</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  malesuada lorem maximus mauris scelerisque, at rutrum nulla
                  dictum. Ut ac ligula sapien. Suspendisse cursus faucibus
                  finibus.
                </p>
              </div>
            </div>
            <div className="course-warp">
              <ul className="course-filter controls">
                <li
                  key="all"
                  className={`control ${
                    selectedCategory === 0 ? "Active" : ""
                  }`}
                  onClick={() => setSelectedCategory(0)}
                >
                  All
                </li>
                {Categories.map((category) => (
                  <li
                    key={category.id}
                    className={`control ${
                      selectedCategory === category.id ? "Active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.Nomcategorie}
                  </li>
                ))}
              </ul>
              <div className="row course-items-area">
                {filteredTutorials.map((tutorial) => (
                  <div
                    className="mix col-lg-3 col-md-4 col-sm-6 finance"
                    key={tutorial.id}
                  >
                    <div className="course-item">
                      <a
                        href={`categories/Tutorial/${tutorial.NomTutorial}`}
                        className="flex-1 rounded-md box-border h-[472px] overflow-hidden flex flex-col items-center justify-start border-[1px] border-solid border-gray-500"
                      >
                        <div className="self-stretch h-[340px] overflow-hidden shrink-0 flex flex-row items-start justify-start">
                          <div className="self-stretch flex-1 relative bg-gainsboro">
                            <div className="absolute w-[calc(100%)] top-[calc(50%_-_8px)] flex items-center justify-center h-4">
                              <img
                                src={tutorial.imagePath}
                                alt="Image"
                                className="w-[350px] h-[350px]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start p-3 gap-[4px] text-left text-base">
                          <div className="self-stretch relative leading-[24px]">
                            {tutorial.NomTutorial}
                          </div>

                          <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-center">
                            <div className="relative leading-[24px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-6 h-6 shrink-0">
                              😃
                            </div>
                            <div className="relative leading-[24px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-6 h-6 shrink-0">
                              ✅
                            </div>
                            <div className="relative leading-[24px] flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap w-6 h-6 shrink-0">
                              ❤️
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section>
            <PopuVideos />
          </section>
          <section id="contact-section">
            {(user === null || user.type === "user") && <Contact />}
          </section>
          <p className="espace"></p>
          <Footer />
        </>
      ) : (
        <section className="intro-section">
          <div className="slide-1" data-stellar-background-ratio="0.5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12">
                  <div className="row align-items-center">
                    <div className="col-lg-6 mb-4">
                      <h1>Makseb Solutions</h1>
                      <p className="mb-4">
                        Agence 360 spécialistes de la restauration,Makseb vous
                        accompagne dans la mise en place de vos caisses
                        enregistreuse tactile, vos packagings
                        personnalisés,votre graphisme,votre décoration
                        intérieure. Bref: si vous avez un projet,nous avons la
                        solution
                      </p>
                    </div>

                    <div
                      className="col-lg-5 ml-auto"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <Signe />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HomePage;
