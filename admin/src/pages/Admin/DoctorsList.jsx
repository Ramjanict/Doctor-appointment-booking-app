import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 gap-y-6 pt-5">
        {doctors.map((item, index) => {
          return (
            <div
              key={index}
              className="max-w-56 border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                className=" bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <p className="text-lg text-neutral-800 font-medium">
                  {item.name}
                </p>
                <p className="text-sm text-zinc-600">{item.speciality}</p>
                <div className=" flex items-center gap-1 text-sm mt-2 ">
                  <input
                    onChange={() => {
                      changeAvailability(item._id);
                    }}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorsList;
