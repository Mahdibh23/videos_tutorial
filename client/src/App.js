

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutPage from "./pages/AboutPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import Profil from "./pages/ProfilPage";
import Videos from "./pages/VideosPage";
import Tutorial from "./pages/TutorialPage";
import "./global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories/:Nomcategorie" element={<CategoryDetailPage />} />
        <Route path="/categories/Tutorial/:NomTutorial" element={<Tutorial />} />
        <Route path="/categories/Tutorial/:NomTutorial/:Nomvideo" element={<Videos />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;


