import React from "react";
import cancel from "../assets/cancel.gif";
import { Link } from "react-router-dom";
const Cancel = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 text-xl py-10 ">
      <img className="w-52" src={cancel} />
      <p className="font-bold text-red-600">Payment Cancel</p>
      <Link
        to={"/my-appointments"}
        className="px-3 py-1 border-2 border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-all"
      >
        My appointments
      </Link>
    </div>
  );
};

export default Cancel;
