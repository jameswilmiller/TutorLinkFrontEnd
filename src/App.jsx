import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import BecomeTutorPage from "./pages/BecomeTutorPage/BecomeTutorPage"
import HomePage from "./pages/HomePage"
import VerifyPage from "./pages/VerifyPage"
import BrowsePage from './pages/BrowsePage'
import TutorProfilePage from "./pages/TutorProfilePage"
import TutorDashboardPage from "./pages/TutorDashboardPage"
import ProtectedRoute from './components/common/ProtectedRoute'
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import AboutPage from "./pages/AboutPage/AboutPage"
import HelpPage from "./pages/HelpPage"
import MyBookingsPage from "./pages/MyBookingsPage"
import BookingDetailPage from "./pages/BookingDetailPage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage"
import CookiePolicyPage from "./pages/CookiePolicyPage"
function App() {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/browse" element={<BrowsePage/>} />
          <Route path="/tutors/:id" element={<TutorProfilePage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/help" element={<HelpPage/>}/>
          <Route path="/verify" element={<VerifyPage/>}/>
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/cookiepolicy" element={<CookiePolicyPage/>} />
          
          <Route path="/become-a-tutor" element={
            <ProtectedRoute>
              <BecomeTutorPage/>
            </ProtectedRoute>
          }/>
          <Route path="/tutor/dashboard" element={
            <ProtectedRoute>
              <TutorDashboardPage/>
            </ProtectedRoute>
          }/>
          <Route path="/bookings" element={
            <ProtectedRoute>
              <MyBookingsPage/>
            </ProtectedRoute>
          }/>

          <Route path="/bookings/:id" element={
            <ProtectedRoute>
              <BookingDetailPage/>
            </ProtectedRoute>
          }/>
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App;