import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-gray-500 text-center pt-10">
        <p>
          CONTACT <span className=" text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row  justify-center gap-12 text-sm my-10 mb-28">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt="image"
        />

        <div className="flex flex-col justify-center gap-6 text-gray-500">
          <p className="text-lg text-gray-600 font-semibold"> OUR OFFICE</p>
          <p>
            Rupnagar Road, Mirpur, Dhaka <br />
            Road 04, House#25, Bangladesh
          </p>
          <p>
            Tel: 013034-88984
            <br />
            Email: mdramjan.ict@gmail.com
          </p>
          <p className="text-lg text-gray-600 font-semibold">
            CAREERS AT PRESCRIPTO
          </p>
          <p>Learn more about our teams and job openings.</p>
          <button className=" border border-black text-sm px-8 py-4 hover:bg-black hover:text-white transition-all duration-300 w-max">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
