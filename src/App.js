import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Home from "./pages/Home/home";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Login from "./components/login/login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Events from "./pages/dashboard/Events";
import EventManagement from "./pages/dashboard/EventManagement";
import Profile from "./pages/dashboard/Profile";
import NewRequests from "./pages/dashboard/NewRequests";
import Estimate from "./pages/dashboard/Estimate";
import PartialRequests from "./pages/dashboard/PartialRequests";
import Positions from "./pages/dashboard/Positions";
import Contractors from "./pages/dashboard/Contractors";
import Admins from "./pages/dashboard/Admins";
import Clients from "./pages/dashboard/Clients";
import Coordinators from "./pages/dashboard/Coordinators";
import NotFound from "./pages/NotFound/NotFound";
import Payment from "./pages/Payment/Payment";
import GoogleAuthCallback from "./pages/Auth/GoogleAuthCallback";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";

// Context
import { UserProvider } from "./context/UserContext";

// Programs
import FirstLegoLeague from "./pages/programs/FirstLegoLeague";
import FirstTechChallenge from "./pages/programs/FirstTechChallenge";
import FirstRoboticsCompetition from "./pages/programs/FirstRoboticsCompetition";
import YouthSafety from "./pages/programs/YouthSafety";

// Community
import Students from "./pages/community/Students";
import Mentors from "./pages/community/Mentors";
import Alumni from "./pages/community/Alumni";
import Partners from "./pages/community/Partners";

// Help
import DonateC from "./pages/help/Donate";
import ContactUsC from "./pages/help/ContactUsC";
import Sponsorship from "./pages/help/Sponsorship";

// About
import AboutFirst from "./pages/about/AboutFirst";
import Leadership from "./pages/about/Leadership";
import Careers from "./pages/about/Careers";

// Animation
import AnimatiAbout from "./components/AnimatiAbout/AnimatiAbout";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={1500} />

        <Routes>

          {/* ✅ ADMIN PROTECTED ROUTES */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="new-requests" element={<NewRequests />} />
            <Route path="estimate" element={<Estimate />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventManagement />} />
            <Route path="partial-requests" element={<PartialRequests />} />
            <Route path="positions" element={<Positions />} />
            <Route path="contractors" element={<Contractors />} />
            <Route path="admins" element={<Admins />} />
            <Route path="clients" element={<Clients />} />
            <Route path="coordinators" element={<Coordinators />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* ✅ PUBLIC ROUTES */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="payment" element={<Payment />} />
            <Route path="auth/google/callback" element={<GoogleAuthCallback />} />

            {/* Programs */}
            <Route path="programs/first-lego-league" element={<FirstLegoLeague />} />
            <Route path="programs/first-tech-challenge" element={<FirstTechChallenge />} />
            <Route path="programs/first-robotics-competition" element={<FirstRoboticsCompetition />} />
            <Route path="youth-safety" element={<YouthSafety />} />

            {/* Community */}
            <Route path="community/students" element={<Students />} />
            <Route path="community/mentors" element={<Mentors />} />
            <Route path="community/alumni" element={<Alumni />} />
            <Route path="community/partners" element={<Partners />} />

            {/* Help */}
            <Route path="help/donate" element={<DonateC />} />
            <Route path="help/contactus" element={<ContactUsC />} />
            <Route path="help/sponsorship" element={<Sponsorship />} />

            {/* About */}
            <Route path="about-first" element={<AboutFirst />} />
            <Route path="leadership" element={<Leadership />} />
            <Route path="careers" element={<Careers />} />

            <Route path="animation" element={<AnimatiAbout />} />

            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
