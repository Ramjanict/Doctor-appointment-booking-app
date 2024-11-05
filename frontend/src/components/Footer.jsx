import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 text-sm my-10 mt-40">
        <div className=" ">
          <img className="w-40 pb-5" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6 ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div>
          <p className=" text-xl  font-medium pb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className=" text-xl  font-medium pb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>01303-488984</li>
            <li>mdramjan.ict@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="py-5 text-center text-sm">
        Copyright 2024 @ ramjan.netlify.app - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
