import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showmenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <div className="flex items-center justify-between text-sm border-b border-gray-400  mb-5 py-4">
      <Link to={"/"} className="w-40 cursor-pointer">
        <img className="w-full" src={assets.logo} alt="logo" />
      </Link>
      <ul className="hidden md:flex items-center gap-2 lg:gap-4 uppercase font-medium">
        <NavLink to="/">
          <li className="py-1">home</li>
          <hr className=" border-none outline-none  bg-primary w-3/5 h-0.5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">all doctors</li>
          <hr className=" border-none outline-none  bg-primary w-3/5 h-0.5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">about</li>
          <hr className=" border-none outline-none  bg-primary w-3/5 h-0.5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">contact</li>
          <hr className=" border-none outline-none  bg-primary w-3/5 h-0.5 m-auto hidden" />
        </NavLink>

        <button className=" capitalize">
          <a
            href="https://doctoradmin.vercel.app/"
            target="_blank"
            className="px-3 py-1 rounded-full border border-gray-500 text-xs font-medium"
          >
            Admin Panel
          </a>
        </button>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer relative group">
            <img
              className="w-8 h-8 rounded-full"
              src={userData.image}
              alt="profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="dropicon" />
            <div className=" absolute top-0 right-0 pt-14 text-base font-medium capitalize text-gray-600 hidden  group-hover:block z-20">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  my profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  my appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-primary text-white px-6 py-3 rounded-full capitalize font-light hidden md:block"
          >
            create account
          </button>
        )}

        <img
          onClick={() => {
            setShowMenu(true);
          }}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="icon"
        />

        <div
          className={`${
            showmenu ? "fixed w-full " : "w-0 h-0"
          } md:hidden top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="w-full flex items-center justify-between px-5 py-6 ">
            <img className="w-36" src={assets.logo} alt="logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => {
                setShowMenu(false);
              }}
              src={assets.cross_icon}
              alt="icon"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 px-5 pt-5 text-lg font-medium uppercase">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">all doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">about</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">contact</p>
            </NavLink>
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className=" hover:bg-primary hover:text-white transition-all  px-4 py-2 rounded uppercase  "
            >
              create account
            </button>

            <button className="">
              <a
                href="https://doctoradmin.vercel.app/"
                target="_blank"
                className="hover:bg-primary hover:text-white transition-all  px-4 py-2 rounded uppercase"
              >
                Admin Panel
              </a>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
