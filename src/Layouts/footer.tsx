"use client";

import { useEffect, useState } from "react";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  // --- resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      <div
        className="bg-white flex justify-between items-center w-full p-5"
        style={isMobile ? { bottom: 0, position: "fixed", height: "100px", left: 0, right: 0, fontSize: "14px" } : { bottom: 0, position: "absolute", height: "100px", left: 0, right: 0 }}
      >
        <div>©Sirarom 2024 - All rights reserved</div>
        <div>compattana.com</div>
      </div>
    </>
  );
};

export { Footer };
