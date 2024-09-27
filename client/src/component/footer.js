import React from "react";

const Footer = () => {
  return (
    <footer className="sticky-footer">
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-center p-[20px] z-[9] text-center text-xl text-white">
        <div className="h-[25px] flex flex-row items-center justify-center gap-[60px]">
          <a href="/about">
            <div className="self-stretch relative leading-[28px] flex items-center justify-center w-[81px] shrink-0">
              À propos
            </div>
          </a>
          <p>&copy; 2024 Votre Entreprise</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
