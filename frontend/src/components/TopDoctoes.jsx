import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorLoading from "./DoctorLoading";
import Pagination from "./Pagination";

const TopDoctoes = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const loadingLists = new Array(10).fill(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const totalPost = doctors.length;
  const doctorsData = doctors.slice(firstPostIndex, lastPostIndex);
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-gray-800 ">
      <h1 className="text-3xl font-bold">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center ">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 gap-y-6 py-5 px-3 ">
        {doctorsData.length > 0
          ? doctorsData.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/appointment/${item._id}`);
                    scrollTo(0, 0);
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
          : loadingLists.map((loadling, index) => {
              return <DoctorLoading key={index} />;
            })}
      </div>

      <Pagination
        totalPost={totalPost}
        postPerPage={postPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TopDoctoes;
