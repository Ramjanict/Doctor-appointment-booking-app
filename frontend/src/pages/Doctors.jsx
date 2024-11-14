import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import DoctorLoading from "../components/DoctorLoading";

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const [showFilters, setShowFilters] = useState();
  const [filterDoc, setFilterDoc] = useState([]);
  const { speciality } = useParams();
  const navigate = useNavigate();
  const loadingLists = new Array(8).fill(null);
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((doc) => {
          return doc.speciality === speciality;
        })
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div>
      <p className=" text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row gap-5 pt-5">
        <button
          onClick={() => {
            setShowFilters((pre) => !pre);
          }}
          className={`${
            showFilters ? "bg-primary text-white" : ""
          } px-3 py-1 border rounded w-max sm:hidden  transition-all`}
        >
          Filters
        </button>

        <div
          className={` flex-col gap-4 text-sm text-gray-600 ${
            showFilters ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() => {
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate(`/doctors/General physician`);
            }}
            className={`w-[94vw] sm:w-auto pl-2 pr-12 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-indigo-50 text-black"
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() => {
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist");
            }}
            className={`w-[94vw] sm:w-auto pl-2 pr-12 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-indigo-50 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => {
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist");
            }}
            className={`w-[94vw] sm:w-auto pl-2 pr-12 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-indigo-50 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() => {
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians");
            }}
            className={`w-[94vw] sm:w-auto pl-2 pr-12 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-indigo-50 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() => {
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist");
            }}
            className={`w-[94vw] sm:w-auto pl-2 pr-12 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-50 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() => {
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist");
            }}
            className={`w-[94vw] sm:w-auto pl-2 pr-12 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-50 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6 ">
          {filterDoc.length > 0
            ? filterDoc.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/appointment/${item._id}`);
                    }}
                    className="border border-blue-200 rounded-xl hover:translate-y-[-10px] transition-all duration-500 cursor-pointer overflow-hidden"
                    key={index}
                  >
                    <img
                      className="bg-blue-50"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="p-2">
                      <div className="flex items-center gap-2 text-green-500 text-sm">
                        <p className="w-2 h-2 rounded-full bg-green-500"></p>
                        <p>Available</p>
                      </div>
                      <p className="text-lg font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">{item.speciality}</p>
                    </div>
                  </div>
                );
              })
            : loadingLists.map((loading, index) => {
                return <DoctorLoading key={index} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
