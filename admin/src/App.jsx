import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./middleware/ProtectedRoute";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ContactSubmissions from "./pages/ContactSubmissions";
import HeroSlides from "./pages/HeroSlides";
import Announcements from "./pages/Announcements";
import TeamManagement from "./pages/TeamManagement";
import Programs from "./pages/Programs";
import Achievements from "./pages/Achievements";
import MediaGallery from "./pages/MediaGallery";
import News from "./pages/News";
import Donations from "./pages/Donations";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Commendation from "./pages/Commendation";
import JoinRequests from "./pages/JoinRequests";
import SocialLinks from "./pages/SocialLinks";
import AboutUsAdmin from "./pages/AboutUs";
import SacredMemory from "./pages/SacredMemory";

const App = () => {
  useAuth();
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/contact-submissions" element={<ContactSubmissions />} />
                    <Route path="/hero-slides" element={<HeroSlides />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/team" element={<TeamManagement />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/media" element={<MediaGallery />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/donations" element={<Donations />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/commendation" element={<Commendation />} />
                    <Route path="/join-requests" element={<JoinRequests />} />
                    <Route path="/social-links" element={<SocialLinks />} />
                    <Route path="/about-us" element={<AboutUsAdmin />} />
                    <Route path="/sacred-memory" element={<SacredMemory />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;