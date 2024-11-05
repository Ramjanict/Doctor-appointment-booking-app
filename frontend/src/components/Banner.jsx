import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary flex flex-col md:flex-row items-center justify-between rounded-lg my-20 px-6 md:px-10 lg:px-12">
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 py-10">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold">
          <h2>Book Appointment</h2>
          <h2 className="mt-4">With 100+ Trusted Doctors</h2>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="w-max flex items-center gap-2 px-8 py-3 rounded-full text-gray-600 bg-white text-sm hover:scale-105 transition-all duration-300 "
        >
          Create account
        </button>
      </div>
      <div className="hidden md:block w-full md:w-1/2 ">
        <img
          className="w-full max-w-md ml-auto"
          src={assets.appointment_img}
          alt="appointment image"
        />
      </div>
    </div>
  );
};

export default Banner;
