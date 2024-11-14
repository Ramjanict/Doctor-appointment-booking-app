import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import DoctorLoading from "../../components/DoctorLoading";

const DoctorsList = () => {
  const { doctors, getAllDoctors, atoken, changeAvailability } =
    useContext(AdminContext);
  const loadingLists = new Array(10).fill(null);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium text-center lg:text-start">
        All Doctors
      </h1>
      <div className="w-full flex justify-center lg:justify-start flex-wrap gap-4 gap-y-6 pt-5">
        {doctors.length > 0
          ? doctors.map((item, index) => {
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
            })
          : loadingLists.map((item, index) => {
              return <DoctorLoading key={index} />;
            })}
      </div>
    </div>
  );
};

export default DoctorsList;
