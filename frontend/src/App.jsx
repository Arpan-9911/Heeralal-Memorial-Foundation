import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import About from "./pages/About";
import Media from "./pages/Media";
import Achievements from "./pages/Achievements";
import Programs from "./pages/Programs";
import Teams from "./pages/Teams";
import NotFound from "./pages/NotFound";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import JoinUs from "./pages/JoinUs";
import ApplicationForms from "./pages/ApplicationForms";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/apply" element={<ApplicationForms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App