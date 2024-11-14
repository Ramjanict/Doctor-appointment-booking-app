import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dtoken,
    dashData,
    getDashData,
    CompleteAppointment,
    CancelAppointment,
  } = useContext(DoctorContext);
  const { sloteDateFormate, currency } = useContext(AppContext);
  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap items-center justify-center sm:justify-start   gap-3">
          <div className="flex items-center gap-2 min-w-52 p-4  bg-white rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.earning_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earning}
              </p>
              <p className="text-gray-400">Earning</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-52 p-4  bg-white rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.appointments_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-52 p-4  bg-white rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.patients_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 p-4  rounded-t border mt-10">
            <img src={assets.list_icon} alt="icon" />
            <p className=" font-semibold">Latest Appointments</p>
          </div>
          <div>
            {dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 "
                  >
                    <img
                      className="w-10 rounded-full"
                      src={item.userData.image}
                      alt=""
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800 font-semibold">
                        {item.userData.name}
                      </p>
                      <p className="text-gray-800">
                        Booking on {sloteDateFormate(item.slotDate)}
                      </p>
                    </div>
                    {item.cancelled ? (
                      <p className="text-xs text-red-400 font-medium">
                        Cancelled
                      </p>
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
              })
            ) : (
              <p className="text-lg sm:text-center p-4">
                Appointment lists are empty.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
