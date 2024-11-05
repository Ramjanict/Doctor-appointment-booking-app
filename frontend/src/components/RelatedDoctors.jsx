import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDocs, setReldocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const docotrsDatas = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setReldocs(docotrsDatas);
    }
  }, [doctors, speciality, docId]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-gray-800 ">
      <h1 className="text-3xl font-bold"> Related Doctors</h1>
      <p className="sm:w-1/3 text-center ">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6 py-5 px-3 ">
        {relDocs.slice(0, 5).map((item, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl hover:translate-y-[-10px] transition-all duration-500 cursor-pointer overflow-hidden"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt={item.name} />
              <div className="p-2">
                <div className="flex items-center gap-2 text-green-500 text-sm">
                  <p className="w-2 h-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className=" px-8 py-3 rounded-full bg-blue-50 text-gray-600"
      >
        Load more
      </button>
    </div>
  );
};

export default RelatedDoctors;
