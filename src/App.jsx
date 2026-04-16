
import './App.css'
import {Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import AuthLayout from "./layouts/AuthLayout"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import BecomeTutorPage from "./pages/BecomeTutorPage"
import HomePage from "./pages/HomePage"
import VerifyPage from "./pages/VerifyPage"
import BrowsePage from './pages/BrowsePage'
import TutorProfilePage from "./pages/TutorProfilePage"
import ProtectedRoute from './components/shared/ProtectedRoute'
function App() {
  return(
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/browse" element={<BrowsePage/>} />
        <Route path="/tutors/:id" element={<TutorProfilePage />} />
        <Route path="/become-a-tutor" 
        element={
          <ProtectedRoute>
          <BecomeTutorPage/>
          </ProtectedRoute>}
          />
        </Route>

      <Route element={<AuthLayout/>}>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/verify" element={<VerifyPage/>}/>
        
      
      </Route>
      
    </Routes>   
  )
}

export default App;