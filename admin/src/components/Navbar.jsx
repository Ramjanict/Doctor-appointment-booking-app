import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
const Navbar = () => {
  const { atoken, setAtoken } = useContext(AdminContext);
  const { dtoken, setDtoken } = useContext(DoctorContext);

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");
    dtoken && setDtoken("");
    dtoken && localStorage.removeItem("dtoken");
  };
  return (
    <div className=" flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white">
      <Link to="/" className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="logo"
        />
        <p className="px-2.5 py.5 rounded-full border border-gray-500 text-gray-600">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </Link>
      <button
        onClick={logout}
        className="bg-primary text-sm text-white px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
