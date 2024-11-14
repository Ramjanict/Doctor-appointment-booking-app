import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { dashboardData, getDashboardData, atoken, cancelAppointment } =
    useContext(AdminContext);
  const { sloteDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getDashboardData();
    }
  }, [atoken]);

  return (
    dashboardData && (
      <div className="m-5">
        <div className="flex flex-wrap items-center justify-center sm:justify-start  gap-3">
          <div className="flex items-center gap-2 min-w-52 p-4  bg-white rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.doctor_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-52 p-4  bg-white rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.appointments_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-52 p-4  bg-white rounded border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer">
            <img className="w-14" src={assets.patients_icon} alt="icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.patients}
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
            {dashboardData.latestAppointments.length > 0 ? (
              dashboardData.latestAppointments.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 "
                  >
                    <img
                      className="w-10 rounded-full"
                      src={item.docData.image}
                      alt=""
                    />
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800 font-semibold">
                        {item.docData.name}
                      </p>
                      <p className="text-gray-800">
                        Booking on {sloteDateFormate(item.slotDate)}
                      </p>
                    </div>
                    {item.cancelled ? (
                      <p className=" text-xs text-red-400 font-medium">
                        Cancelled
                      </p>
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

export default Dashboard;
