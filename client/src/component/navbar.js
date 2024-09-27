import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { BsPersonCircle } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";

import "../style/owl.carousel.css";
import "../style/owl.theme.default.min.css";
import "../style/bootstrap.min.css";

const Navbar = () => {
  const user = sessionStorage.getItem("user");
  const userString = user ? JSON.parse(user) : null;
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.hash);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    //console.log(location);
    if (location.pathname !== "/") {
      navigate(menuItem);
      setActiveMenuItem(menuItem);
    }
  };


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyles = useSpring({
    opacity: scrollY > 50 ? 0.8 : 1,
    background: scrollY > 100 ? "#000000" : "#15D4EE",
  });

  return (
    <animated.header
      style={{
        ...navbarStyles,
        position: "fixed",
        width: "100%",
        zIndex: 1000,
      }}
      className="site-navbar py-4 js-sticky-header site-navbar-target"
      role="banner"
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="site-logo mr-auto w-23">
            <a href="/">Makseb Solutions</a>
          </div>
          <div className="mx-auto text-center">
            <nav
              className="site-navigation position-relative text-right"
              role="navigation"
            >
              <ul className="site-menu main-menu js-clone-nav mx-auto d-lg-flex m-0 p-0">
                <li>
                  <ScrollLink
                    to="home-section"
                    href="/#home-section"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`nav-link ${
                      activeMenuItem === "/#home-section" ? "Nav-Active" : ""
                    }`}
                    onClick={() => handleMenuClick("/#home-section")}
                  >
                    Accueil
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="Categories-section"
                    href="/#Categories-section"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`nav-link ${
                      activeMenuItem === "/#Categories-section"
                        ? "Nav-Active"
                        : ""
                    }`}
                    onClick={() => handleMenuClick("/#Categories-section")}
                  >
                    Catégories
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="Tutorial-section"
                    href="/#Tutorial-section"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className={`nav-link ${
                      activeMenuItem === "/#Tutorial-section"
                        ? "Nav-Active"
                        : ""
                    }`}
                    onClick={() => handleMenuClick("/#Tutorial-section")}
                  >
                    Tutorial
                  </ScrollLink>
                </li>
                <li>
                  <a href="/Profil">
                    <BsPersonCircle />
                  </a>
                </li>
              </ul>
            </nav>
            {/* Affiche le bouton de menu mobile uniquement sur les petites résolutions */}
            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
              ☰
            </div>
            {/* Affiche les liens de navigation sur les résolutions plus larges */}
            <div
              className={`navbar-links ${
                isMobileMenuOpen ? "active" : "hidden"
              }`}
            >
              <ul>
                <li>
                  <a
                    href="/#home-section"
                    className={`nav-link ${
                      activeMenuItem === "/#home-section" ? "Active" : ""
                    }`}
                    onClick={() => {
                      handleMenuClick("/#home-section");
                      toggleMobileMenu(); // Ferme le menu mobile après le clic
                    }}
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="/#Categories-section"
                    className={`nav-link ${
                      activeMenuItem === "/#Categories-section" ? "Active" : ""
                    }`}
                    onClick={() => {
                      handleMenuClick("/#Categories-section");
                      toggleMobileMenu();
                    }}
                  >
                    Catégories
                  </a>
                </li>
                <li>
                  <a
                    href="/#Tutorial-section"
                    className={`nav-link ${
                      activeMenuItem === "/#Tutorial-section" ? "Active" : ""
                    }`}
                    onClick={() => {
                      handleMenuClick("/#Tutorial-section");
                      toggleMobileMenu();
                    }}
                  >
                    Tutorial
                  </a>
                </li>
                {userString.type === "user" && (
                  <li>
                    <a
                      href="#contact-section"
                      onClick={() => toggleMobileMenu()} // Ferme le menu mobile après le clic
                    >
                      <span>Contact Us</span>
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href="/Profil"
                    onClick={() => toggleMobileMenu()} // Ferme le menu mobile après le clic
                  >
                    <BsPersonCircle />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {userString.type === "user" && (
            <div className="ml-auto w-25">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu main-menu site-menu-dark js-clone-nav d-lg-flex m-0 p-0">
                  <li className="cta">
                    <ScrollLink
                      to="contact-section"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`nav-link ${
                        activeMenuItem === "/#contact-section"
                          ? "Nav-Active"
                          : ""
                      }`}
                      onClick={() => handleMenuClick("/#contact-section")}
                    >
                      <span>Contact Us</span>
                    </ScrollLink>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </animated.header>
  );
};

export default Navbar;
