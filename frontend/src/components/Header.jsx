import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-primary rounded-lg px-6 md:px-12 pt-20">
      <div className="w-full md:w-1/2 flex flex-col  items-center md:items-start justify-center gap-4 pb-10  ">
        <p className="text-3xl lg:text-4xl font-semibold text-white leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col items-center md:flex-row text-white text-sm gap-3">
          <img className="w-28 h-12" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted
            <br className=" hidden sm:block" /> doctors, schedule your
            appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className=" w-max flex items-center gap-2 px-8 py-3 rounded-full text-gray-600 bg-white text-sm hover:scale-105 transition-all duration-300 "
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      <div className="w-full md:w-1/2 self-end">
        <img className="w-full " src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
