import React, { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { useNavigate, Link } from "react-router-dom";
import "../style/style.css";
import VideoItem from "../component/VideoItem";
const CreatAccount = ({
  formData,
  handleInputChange,
  handleSubmit,
  setErrorMessage,
}) => {
  const isFormValid = () => {
    return (
      formData.username.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.type !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== ""
    );
  };

  return (
    <form>
      <div className="Section w-[1283px] h-[225px] px-[170px] py-[60px] center items-center gap-14 inline-flex">
        <div className="Container grow shrink basis-0 flex-col justify-start items-center gap-6 inline-flex">
          <div className="Title w-96 text-center text-black text-4xl font-bold font-['Roboto'] leading-10">
            Create Account
          </div>
          <div className="Description w-96 text-center text-black text-base font-normal font-['Roboto'] leading-normal">
            Please fill in the required information
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="text"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="radio"
                name="type"
                value="user"
                onChange={handleInputChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
                checked={formData.type === "user"}
              />
              <label>user</label>
              <input
                type="radio"
                name="type"
                value="admin"
                onChange={handleInputChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
                checked={formData.type === "admin"}
              />
              <label>admin</label>
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Button justify-start items-start gap-3 inline-flex">
            <div className="Primary w-40 p-3 bg-black rounded-lg flex-col justify-center items-center inline-flex">
              <input
                type="button"
                value="Create Account"
                className="Submet"
                onClick={() => {
                  if (isFormValid()) {
                    handleSubmit();
                  } else {
                    setErrorMessage("Please fill in all required fields");
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
const Creatcategorie = ({
  formCate,
  handlecategoriesChange,
  handleSubmitCate,
  setErrorMessage,
}) => {
  const isFormValid = () => {
    // Add validation logic here
    return (
      formCate.Nomcategorie.trim() !== "" &&
      formCate.descreption.trim() !== "" &&
      formCate.image // Check if an image is selected
    );
  };

  return (
    <form encType="multipart/form-data">
      <div className="Section w-[1283px] h-[225px] px-[170px] py-[60px] center items-center gap-14 inline-flex">
        <div className="Container grow shrink basis-0 flex-col justify-start items-center gap-6 inline-flex">
          <div className="Title w-96 text-center text-black text-4xl font-bold font-['Roboto'] leading-10">
            Create category
          </div>
          <div className="Description w-96 text-center text-black text-base font-normal font-['Roboto'] leading-normal">
            Please fill in the required information
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="text"
                placeholder="Category Name"
                name="Nomcategorie"
                value={formCate.Nomcategorie}
                onChange={handlecategoriesChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="text"
                placeholder="Description"
                name="descreption"
                value={formCate.descreption}
                onChange={handlecategoriesChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="file"
                name="image"
                onChange={handlecategoriesChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Button justify-start items-start gap-3 inline-flex">
            <div className="Primary w-40 p-3 bg-black rounded-lg flex-col justify-center items-center inline-flex">
              <input
                type="button"
                value="Create Category"
                className="Submet"
                onClick={() => {
                  if (isFormValid()) {
                    handleSubmitCate();
                  } else {
                    setErrorMessage("Please fill in all required fields");
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
const CreatTutorial = ({
  setisCreatTutorial,
  setErrorMessage,
  setsuccessMessage,
}) => {
  const [Categories, setCategories] = useState([]);
  const [formtuto, setFormtuto] = useState({
    NomTutorial: "",
    descreption: "",
    image: null,
    category: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };
    fetchCategories();
  }, []);
  const isFormValid = () => {
    return (
      formtuto.NomTutorial.trim() !== "" &&
      formtuto.descreption.trim() !== "" &&
      formtuto.category !== "" &&
      formtuto.image !== null
    );
  };
  const handleTutorialChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormtuto({ ...formtuto, [name]: files[0] || null });
    } else {
      setFormtuto({ ...formtuto, [name]: value });
    }
  };

  const handleSubmitTute = async () => {
    if (!isFormValid()) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    const formData = new FormData();

    formData.append("NomTutorial", formtuto.NomTutorial);
    formData.append("descreption", formtuto.descreption);
    formData.append("category", formtuto.category);
    formData.append("image", formtuto.image);

    try {
      const response = await fetch("http://localhost:3001/Tutorial", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      //console.log(data);

      if (data.message === true) {
        setsuccessMessage("Creation tutorial successful.");
        setErrorMessage("");
        setisCreatTutorial(false);
        setFormtuto({
          NomTutorial: "",
          descreption: "",
          image: null,
          category: "",
        });
      } else {
        setErrorMessage("Error.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <form encType="multipart/form-data">
      <div className="Section w-[1283px] h-[225px] px-[170px] py-[60px] center items-center gap-14 inline-flex">
        <div className="Container grow shrink basis-0 flex-col justify-start items-center gap-6 inline-flex">
          <div className="Title w-96 text-center text-black text-4xl font-bold font-['Roboto'] leading-10">
            Create Tutorial
          </div>
          <div className="Description w-96 text-center text-black text-base font-normal font-['Roboto'] leading-normal">
            Veuillez remplir les informations requises
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="text"
                placeholder="Tutorial Name"
                name="NomTutorial"
                value={formtuto.NomTutorial}
                onChange={handleTutorialChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="text"
                placeholder="Description"
                name="descreption"
                value={formtuto.descreption}
                onChange={handleTutorialChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <select
                name="category"
                value={formtuto.category}
                onChange={handleTutorialChange}
              >
                <option value="">Select catégorie</option>
                {Categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.Nomcategorie}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="file"
                name="image"
                onChange={handleTutorialChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Button justify-start items-start gap-3 inline-flex">
            <div className="Primary w-40 p-3 bg-black rounded-lg flex-col justify-center items-center inline-flex">
              <input
                type="button"
                value="Create Category"
                className="Submet"
                onClick={handleSubmitTute}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const AjoutVideos = ({
  SetisCreatVideo,
  setErrorMessage,
  setsuccessMessage,
}) => {
  const [Tutorials, setTutorials] = useState([]);
  const [formVideo, setFormVideo] = useState({
    nomvideo: "",
    description: "",
    video: null,
    tutorial: "",
  });

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("http://localhost:3001/Tutorial");
        const data = await response.json();
        setTutorials(data.tutorialWithImage);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };
    fetchTutorials();
  }, []);

  const handleVideoChange = (e) => {
    const { name, value, files } = e.target;
    setFormVideo({
      ...formVideo,
      [name]: name === "video" ? files[0] : value,
    });
  };

  const handleSubmitVideo = async () => {
    if (
      formVideo.nomvideo.trim() === "" ||
      formVideo.description.trim() === "" ||
      formVideo.tutorial.trim() === "" ||
      formVideo.video === null
    ) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("nomvideo", formVideo.nomvideo);
    formData.append("description", formVideo.description);
    formData.append("tutorial", formVideo.tutorial);
    formData.append("video", formVideo.video);

    try {
      const response = await fetch("http://localhost:3001/video", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.message === true) {
        setsuccessMessage("Creation video successful.");
        setErrorMessage("");
        SetisCreatVideo(false);
        setFormVideo({
          nomvideo: "",
          description: "",
          video: null,
          tutorial: "",
        });
      } else {
        setErrorMessage("Error:le video est tres longes ");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };
  return (
    <form encType="multipart/form-data">
      <div className="Section w-[1283px] h-[225px] px-[170px] py-[60px] center items-center gap-14 inline-flex">
        <div className="Container grow shrink basis-0 flex-col justify-start items-center gap-6 inline-flex">
          <div className="Title w-96 text-center text-black text-4xl font-bold font-['Roboto'] leading-10">
            Ajoute Video
          </div>
          <div className="Description w-96 text-center text-black text-base font-normal font-['Roboto'] leading-normal">
            Veuillez remplir les informations requises
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="text"
                placeholder="Video Name"
                name="nomvideo"
                value={formVideo.nomvideo}
                onChange={handleVideoChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={formVideo.description}
                onChange={handleVideoChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <select
                name="tutorial"
                value={formVideo.tutorial}
                onChange={handleVideoChange}
              >
                <option value="">Select tutorial</option>
                {Tutorials.map((tutorial) => (
                  <option key={tutorial.id} value={tutorial.id}>
                    {tutorial.NomTutorial}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="Input h-9 flex-col justify-center items-start gap-1 flex">
            <div className="Textfield self-stretch px-3 py-2 bg-white rounded-md border border-black border-opacity-10 justify-start items-center gap-1 inline-flex">
              <input
                type="file"
                name="video"
                onChange={handleVideoChange}
                className="Text grow shrink basis-0 h-5 text-black text-opacity-50 text-sm font-normal font-['Roboto'] leading-tight"
              />
            </div>
          </div>
          <div className="Button justify-start items-start gap-3 inline-flex">
            <div className="Primary w-40 p-3 bg-black rounded-lg flex-col justify-center items-center inline-flex">
              <input
                type="button"
                value="Create Video"
                className="Submet"
                onClick={handleSubmitVideo}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const Message = ({ messages }) => (
  <table className="message-table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Email</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      {messages.map((message, index) => (
        <tr key={index}>
          <td>{message.nom}</td>
          <td>{message.email}</td>
          <td>{message.message}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

function ProfilPage() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [History, setHistory] = useState([]);
  const [historyVideos, setHistoryVideos] = useState([]);
  const [messages, setmessages] = useState([]);
  const [isCreatAccountVisible, setIsCreatAccountVisible] = useState(false);
  const [isCreatcategorie, setIsCreatcategorie] = useState(false);
  const [isMessages, SetisMessages] = useState(false);
  const [isCreatTutorial, setisCreatTutorial] = useState(false);
  const [isCreatVideo, SetisCreatVideo] = useState(false);
  const [Tutorials, setTutorials] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    type: "user",
    password: "",
    confirmPassword: "",
  });
  const [formCate, setFormCate] = useState({
    Nomcategorie: "",
    descreption: "",
    image: null,
  });

  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, [user, navigate]);

  const getHistoryVideos = async (History) => {
    try {
      const response = await fetch("http://localhost:3001/historique", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ history: History }),
      });
      const data = await response.json();
      setHistoryVideos(data.videos);
      //console.log(data.videos)
    } catch (error) {
      console.error(
        "Erreur lors de la requête pour récupérer les vidéos d'historique :",
        error
      );
    }
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password and Confirm Password do not match");
      return;
    }
    //console.log("Données du formulaire :", formData);
    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === true) {
          setsuccessMessage("creation compte secesseful .");
          setErrorMessage("");
          setIsCreatAccountVisible(false);
          setFormData({
            username: "",
            email: "",
            type: "user",
            password: "",
            confirmPassword: "",
          });
        } else {
          setErrorMessage(" error.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };
  const handleSubmitCate = async () => {
    const formData = new FormData(); // Utilisez FormData pour envoyer des fichiers

    formData.append("Nomcategorie", formCate.Nomcategorie);
    formData.append("descreption", formCate.descreption);
    formData.append("image", formCate.image);

    fetch("http://localhost:3001/categories", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === true) {
          setsuccessMessage("Creation categories successful.");
          setErrorMessage("");
          setIsCreatcategorie(false);
          setFormCate({
            Nomcategorie: "",
            descreption: "",
            image: null,
          });
        } else {
          setErrorMessage("Error.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlecategoriesChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormCate({ ...formCate, [name]: files[0] || null });
    } else {
      setFormCate({ ...formCate, [name]: value });
    }
  };

  const handleButtonAccount = () => {
    setErrorMessage("");
    setsuccessMessage("");
    setIsCreatAccountVisible(!isCreatAccountVisible);
    setIsCreatcategorie(false);
    SetisMessages(false);
    setisCreatTutorial(false);
    SetisCreatVideo(false);
  };

  const handleButtoncategorie = () => {
    setErrorMessage("");
    setsuccessMessage("");
    setIsCreatAccountVisible(false);
    setIsCreatcategorie(!isCreatcategorie);
    SetisMessages(false);
    setisCreatTutorial(false);
    SetisCreatVideo(false);
  };

  const handleMessage = () => {
    setErrorMessage("");
    setsuccessMessage("");
    setIsCreatAccountVisible(false);
    setIsCreatcategorie(false);
    SetisMessages(!isMessages);
    setisCreatTutorial(false);
    SetisCreatVideo(false);
  };
  const handleButtonTutorial = () => {
    setErrorMessage("");
    setsuccessMessage("");
    setIsCreatAccountVisible(false);
    setIsCreatcategorie(false);
    SetisMessages(false);
    setisCreatTutorial(!isCreatTutorial);
    SetisCreatVideo(false);
  };
  const handleButtonVideo = () => {
    setErrorMessage("");
    setsuccessMessage("");
    setIsCreatAccountVisible(false);
    setIsCreatcategorie(false);
    SetisMessages(false);
    setisCreatTutorial(false);
    SetisCreatVideo(!isCreatVideo);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("http://localhost:3001/Tutorial");
        const data = await response.json();
        setTutorials(data.tutorialWithImage);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };
    fetchTutorials();
  }, []);

  const getTutorialNameById = (tutorialId) => {
    const tutorial = Tutorials.find((t) => t.id === tutorialId);
    return tutorial ? tutorial.NomTutorial : "";
  };

  useEffect(() => {
    const fetchHistory = async () => {
      fetch("http://localhost:3001/historique", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      })
        .then((response) => response.json())
        .then((data) => {
          setHistory(data.historique);
          getHistoryVideos(data.historique);
          //console.log(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la requête :", error);
        });
    };
    const fetchContact = async () => {
      try {
        const response = await fetch("http://localhost:3001/contact");
        const data = await response.json();
        setmessages(data.message);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };

    fetchHistory();
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user && (
        <>
          <Navbar />
          <div>
            <section>
              <div className="container bootstrap snippets bootdeys">
                <div className="row">
                  <div className="col-md-12">
                    <div className="bg-picture slide-1">
                      <span className="bg-picture-overlay"></span>
                      <div className="box-layout meta bottom">
                        <div className="col-md-6 clearfix">
                          <span className="img-wrapper pull-left m-r-15">
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt=""
                              style={{ width: "64px" }}
                              className="br-radius"
                            />
                          </span>
                          <div className="media-body">
                            <h3 className="text-white mb-2 m-t-10 ellipsis">
                              {user.NomEtPrenom}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 flex-col justify-end items-end gap-3 inline-flex ml-auto">
                    <div className="pull-right">
                      <div className="flex flex-row flex-wrap space-x-4 ">
                        <div className="h-12 p-3 rounded-lg border-black flex-col justify-center items-center flex">
                          <input
                            type="button"
                            value="Se déconnecter"
                            onClick={handleLogout}
                            className="Button"
                          />
                        </div>
                        {user.type === "admin" && (
                          <>
                            <div className="h-12 p-3 rounded-lg flex-col justify-center items-center flex">
                              <input
                                type="button"
                                value="Create Account"
                                className="Button"
                                onClick={handleButtonAccount}
                              />
                            </div>
                            <div className="h-12 p-3 rounded-lg flex-col justify-center items-center flex">
                              <input
                                type="button"
                                value="Create Categorie"
                                className="Button"
                                onClick={handleButtoncategorie}
                              />
                            </div>
                            <div className="h-12 p-3 rounded-lg flex-col justify-center items-center flex">
                              <input
                                type="button"
                                value="Create Tutorial"
                                className="Button"
                                onClick={handleButtonTutorial}
                              />
                            </div>
                            <div className="h-12 p-3 rounded-lg flex-col justify-center items-center flex">
                              <input
                                type="button"
                                value="Ajouter Video"
                                className="Button"
                                onClick={handleButtonVideo}
                              />
                            </div>
                            <div className="h-12 p-3 rounded-lg flex-col justify-center items-center flex">
                              <input
                                type="button"
                                value="Message"
                                className="Button"
                                onClick={handleMessage}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="h-[100px]"></p>
                <div>
                  {isCreatAccountVisible && (
                    <div>
                      <CreatAccount
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        setErrorMessage={setErrorMessage}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {isCreatcategorie && (
                    <div>
                      <Creatcategorie
                        formCate={formCate}
                        handlecategoriesChange={handlecategoriesChange}
                        handleSubmitCate={handleSubmitCate}
                        setErrorMessage={setErrorMessage}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {isCreatTutorial && (
                    <div>
                      <CreatTutorial
                        setErrorMessage={setErrorMessage}
                        setisCreatTutorial={setisCreatTutorial}
                        setsuccessMessage={setsuccessMessage}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {isCreatVideo && (
                    <div>
                      <AjoutVideos
                        SetisCreatVideo={SetisCreatVideo}
                        setErrorMessage={setErrorMessage}
                        setsuccessMessage={setsuccessMessage}
                      />
                    </div>
                  )}
                </div>
                {errorMessage && <span className="error">{errorMessage}</span>}
                {successMessage && (
                  <span className="success">{successMessage}</span>
                )}
              </div>
            </section>
            {user.type === "user" ? (
              <section>
                <div className="w-full px-4 py-8 md:w-[1440px] md:pl-[266px] md:pr-[301px] md:py-[60px] justify-center items-center gap-8 inline-flex">
                  <div className="flex-grow flex-shrink flex-basis-0 flex-col justify-start items-start gap-6">
                    <div className="text-black text-[40px] font-bold font-['Roboto'] leading-[48px]">
                      Historique vidéo
                    </div>
                    <div className="text-black text-base font-normal font-['Roboto'] leading-normal">
                      Voici les vidéos que vous avez regardées
                    </div>
                  </div>
                  <div className="overflow-y-auto w-full md:w-[630px] h-[690px]">
                    <div className="py-5 flex-col justify-center items-center gap-10">
                      {historyVideos.map((video) => (
                        <Link
                          key={video.id}
                          to={`/categories/Tutorial/${getTutorialNameById(
                            video.tutorial
                          )}/${video.title}`}
                        >
                          <VideoItem video={video} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <>
                {isMessages && (
                  <div>
                    <Message messages={messages} />
                  </div>
                )}
              </>
            )}
          </div>
          <p className="h-[200px]"></p>
          <Footer />
        </>
      )}
    </>
  );
}

export default ProfilPage;
