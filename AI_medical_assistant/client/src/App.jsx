import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HeroSection from './components/HeroSection';

// Pages
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import XRayScan from './pages/XRayScan';
import MedLLM from './pages/MedLLM';
import SymptomChecker from './pages/SymptomChecker';
import DietCoach from './pages/DietCoach';
import LabReport from './pages/LabReport';
import ChatWithDoctor from './pages/ChatWithDoctor';
import Profile from './pages/Profile';
import ContactPage from './pages/ContactPage';
import VideoConsultation from './pages/VideoConsultation';  // ✅ Newly added

// Scroll to section behavior
function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <NavBar />
      <ScrollToHashElement />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <HeroSection />
            </main>
          }
        />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/ExpertConsultation" element={<MedLLM />} />
        <Route path="/DiseasePredictor" element={<SymptomChecker />} />
        <Route path="/VisualDiagnosis" element={<ChatWithDoctor />} />
        <Route path="/XRayScan" element={<XRayScan />} />
        <Route path="/LabReportAnalysis" element={<LabReport />} />
        <Route path="/DietLifeStyleCoach" element={<DietCoach />} />
        <Route path="/VideoConsultation" element={<VideoConsultation />} />
        <Route path="/contact" element={<ContactPage />} /> {/* ✅ Contact Page route */}
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
