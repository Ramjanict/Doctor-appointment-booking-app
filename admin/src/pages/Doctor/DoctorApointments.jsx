import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorApointments = () => {
  const {
    dtoken,
    getAppointments,
    appointments,
    CompleteAppointment,
    CancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, sloteDateFormate, currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      {appointments.length > 0 ? (
        <div className=" bg-white border rounded text-sm  max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          <div className=" hidden sm:grid grid-cols-[.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1  grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {appointments.map((item, index) => {
            return (
              <div
                className="flex flex-wrap items-center justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1  py-3 px-6 border-b text-gray-500 hover:bg-gray-50"
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
                <div>
                  <p className="px-2 inline text-xs border border-primary rounded-full">
                    {item.payment ? "Online" : "CASH"}
                  </p>
                </div>
                <p className="max-sm:hidden">
                  {calculateAge(item.userData.dob)}
                </p>

                <p>
                  {sloteDateFormate(item.slotDate)},{item.slotTime}
                </p>

                <p>
                  {currency}
                  {item.amount}
                </p>

                {item.cancelled ? (
                  <p className="text-xs text-red-400 font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-xs text-green-500 font-medium">
                    Completed
                  </p>
                ) : (
                  <div className=" flex items-center ">
                    <img
                      onClick={() => {
                        CancelAppointment(item._id);
                      }}
                      className="w-10  cursor-pointer"
                      src={assets.cancel_icon}
                      alt="image"
                    />
                    <img
                      onClick={() => {
                        CompleteAppointment(item._id);
                      }}
                      className="w-10  cursor-pointer"
                      src={assets.tick_icon}
                      alt="image"
                    />
                  </div>
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

export default DoctorApointments;
