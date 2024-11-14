import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center justify-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-bold">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center ">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-4">
        {specialityData.map((item, index) => {
          return (
            <Link
              onClick={() => {
                scrollTo(0, 0);
              }}
              className="flex flex-col items-center hover:translate-y-[-10px] transition-all duration-300 pt-5 bg-primary  md:bg-transparent rounded-lg w-60  md:w-28 p-4 md:p-0 "
              to={`/doctors/${item.speciality}`}
              key={index}
            >
              <img className="w-full" src={item.image} alt={item.speciality} />
              <p className="text-lg md:text-xs mt-2 text-white md:text-gray-800 ">
                {item.speciality}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;
