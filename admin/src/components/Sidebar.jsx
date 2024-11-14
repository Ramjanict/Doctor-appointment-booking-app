import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 sm:px-9 py-3.5 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/admin-dashboard"
          >
            <img className="min-w-6" src={assets.home_icon} alt="icon" />
            <p className=" hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 sm:px-9 py-3.5 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/all-appointments"
          >
            <img className="min-w-6" src={assets.appointment_icon} alt="icon" />
            <p className=" hidden md:block">Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 sm:px-9 py-3.5 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/add-doctor"
          >
            <img className="min-w-6" src={assets.add_icon} alt="icon" />
            <p className=" hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 sm:px-9 py-3.5 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctors-list"
          >
            <img className="min-w-6" src={assets.people_icon} alt="icon" />
            <p className=" hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dtoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 sm:px-9 py-3.5 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-dashboard"
          >
            <img className="min-w-6" src={assets.home_icon} alt="icon" />
            <p className=" hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 sm:px-9 py-3.5 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-appointments"
          >
            <img className="min-w-6" src={assets.appointment_icon} alt="icon" />
            <p className=" hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 sm:px-9 py-3.5 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to="/doctor-profile"
          >
            <img className="min-w-6" src={assets.people_icon} alt="icon" />
            <p className=" hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
