
import {Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import BecomeTutorPage from "./pages/BecomeTutorPage"
import HomePage from "./pages/HomePage"
import VerifyPage from "./pages/VerifyPage"
import BrowsePage from './pages/BrowsePage'
import TutorProfilePage from "./pages/TutorProfilePage"
import ProtectedRoute from './components/ui/ProtectedRoute'
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
function App() {
  return(
    <>
    <Navbar/>
      <main className="flex flex-col min-h-screen">
        <Routes> 
            <Route path="/" element={<HomePage/>} />
            <Route path="/browse" element={<BrowsePage/>} />
            <Route path="/tutors/:id" element={<TutorProfilePage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/verify" element={<VerifyPage/>}/>
            <Route path="/become-a-tutor" 
            element={
              <ProtectedRoute>
              <BecomeTutorPage/>
              </ProtectedRoute>}
              />
        </Routes>
      </main>
      <Footer/>
    </>   
  )
}

export default App;