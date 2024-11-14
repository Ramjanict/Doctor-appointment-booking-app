import React from "react";
import { Route, Routes } from "react-router-dom";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const App = () => {
  return (
    <div className=" px-4 sm:px-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
