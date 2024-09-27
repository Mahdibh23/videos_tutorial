

import React from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

import '../style/style.css';

function AboutPage() {
  return (
    <div>
      <Navbar />
      <h2>About Page</h2>
      {/* Contenu spécifique à la page d'accueil */}
      <Footer />
    </div>
  );
}

export default AboutPage;
