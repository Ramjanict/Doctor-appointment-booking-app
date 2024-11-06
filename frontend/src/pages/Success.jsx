import React from "react";
import success from "../assets/success.gif";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className=" w-full flex flex-col justify-center items-center  gap-4 text-xl py-10">
      <img className="w-52" src={success} />
      <p className="text-green-600 font-bold">Payment Successfully</p>
      <Link
        to={"/my-appointments"}
        className="px-3 py-1 border-2 border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-all"
      >
        My appointments
      </Link>
    </div>
  );
};

export default Success;
