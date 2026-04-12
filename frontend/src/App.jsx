import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import About from "./pages/About";
import Media from "./pages/Media";
import Achievements from "./pages/Achievements";
import Programs from "./pages/Programs";
import Teams from "./pages/Teams";
import NotFound from "./pages/NotFound";

const App = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("section").forEach((el) => {
      observer.observe(el);
    });
  }, []);
  return (
    <>
      <Toaster position="top-right" richColors />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App