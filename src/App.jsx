import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Gallery from "./components/Gallery"
import Footer from "./components/Footer"
import BookingForm from "./components/BookingForm"

import AdminLogin from "./components/AdminLogin"
import AdminPanel from "./components/AdminPanel"
import ProtectedRoute from "./components/ProtectedRoute"

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <BookingForm />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App