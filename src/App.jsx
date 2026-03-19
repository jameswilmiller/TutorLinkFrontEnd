
import './App.css'
import {Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import AuthLayout from "./Layouts/AuthLayout"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import BecomeTutorPage from "./pages/BecomeTutorPage"
function App() {
  return(
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage/>} />
      </Route>

      <Route element={<AuthLayout/>}>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/become-a-tutor" element={<BecomeTutorPage/>}/>
      
      </Route>
      
    </Routes>   
  )
}

export default App;