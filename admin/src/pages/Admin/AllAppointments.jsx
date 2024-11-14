import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, sloteDateFormate, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      {appointments.length > 0 ? (
        <div className=" bg-white border rounded text-sm  max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          <div className=" hidden sm:grid grid-cols-[.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>
          {appointments.map((item, index) => {
            return (
              <div
                className="flex flex-wrap justify-between items-center gap-4 sm:grid 
              grid-cols-[.5fr_3fr_1fr_3fr_3fr_1fr_1fr] pl  py-3 px-6 border-b text-gray-500 hover:bg-gray-50"
                key={index}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className=" flex items-center gap-2">
                  <img
                    className="w-8 rounded-full"
                    src={item.userData.image}
                    alt="image"
                  />
                  <p>{item.userData.name}</p>
                </div>
                <p className="max-sm:hidden">
                  {calculateAge(item.userData.dob)}
                </p>

                <p>
                  {sloteDateFormate(item.slotDate)},{item.slotTime}
                </p>
                <div className=" flex items-center gap-2">
                  <img
                    className="w-8 rounded-full bg-gray-200"
                    src={item.docData.image}
                    alt="image"
                  />
                  <p>{item.docData.name}</p>
                </div>
                <p>
                  {currency}
                  {item.docData.fees}
                </p>

                {item.cancelled ? (
                  <p className=" text-xs text-red-400 font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => {
                      cancelAppointment(item._id);
                    }}
                    className=" w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="icon"
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="bg-white p-4 rounded  text-lg sm:text-center">
          Appointment lists are empty.
        </p>
      )}
    </div>
  );
};
export default AllAppointments;
