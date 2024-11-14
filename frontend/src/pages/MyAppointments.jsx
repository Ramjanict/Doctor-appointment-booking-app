import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import MyAppointmentLoading from "../components/MyAppointmentLoading";
import { assets } from "../assets/assets";
const MyAppointments = () => {
  const [appointment, setAppointment] = useState([]);
  const [pay, setPay] = useState(false);
  const { token, backendUrl, getDoctorData, stripePoublicKey } =
    useContext(AppContext);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const appointmentLoading = new Array(5).fill(null);

  const sloteDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppoinments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointment(data.appointmens.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppoinment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppoinments();
        getDoctorData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const payOnline = async (appointmentId) => {
    try {
      const stripe = await loadStripe(stripePoublicKey);
      const { data } = await axios.post(
        backendUrl + "/api/user/checkout",
        { appointmentId },
        { headers: { token } }
      );
      console.log("data", data);
      if (data.session) {
        const id = data.session.id;
        return stripe.redirectToCheckout({ sessionId: id });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppoinments();
    }
  }, [token]);
  return (
    <div>
      <p className="text-zinc-700 font-medium border-b pt-12 pb-3">
        My Appointments
      </p>
      <div>
        {appointment.length > 0 ? (
          appointment.map((item, index) => {
            return (
              <div
                key={index}
                className=" grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-b py-2"
              >
                <div>
                  <img
                    className=" w-32 bg-indigo-50"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-medium">
                    {item.docData.name}
                  </p>
                  <p>{item.docData.speciality}</p>
                  <p className="text-sm font-medium text-neutral-700 mt-1">
                    Address:
                  </p>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs">{item.docData.address.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-sm font-medium text-neutral-700 mr-1">
                      Date & Time:
                    </span>
                    {sloteDateFormate(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div></div>

                <div className="flex flex-col justify-end gap-2">
                  {item.cancelled ? (
                    <button className="sm:min-w-48 text-sm text-red-500 border border-red-500 p-2 rounded">
                      Appointment cancelled
                    </button>
                  ) : (
                    <>
                      {pay ? (
                        <div
                          onClick={() => {
                            payOnline(item._id);
                          }}
                          className="sm:min-w-48  border p-2 rounded hover:bg-gray-100  transition-all duration-300 cursor-pointer flex items-center justify-center "
                        >
                          <img
                            className="w-12 "
                            src={assets.stripe_logo}
                            alt=""
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setPay(true);
                          }}
                          className="text-sm text-stone-500 sm:min-w-48  border p-2 rounded hover:bg-primary hover:text-white transition-all duration-300 "
                        >
                          Pay online
                        </button>
                      )}

                      <button
                        onClick={() => {
                          cancelAppoinment(item._id);
                        }}
                        className="text-sm text-stone-500 sm:min-w-48  border p-2 rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        Cancel appointments
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : appointment.length === 0 ? (
          <p className="text-center text-lg font-medium py-2">
            Your appointment is empty.
          </p>
        ) : (
          appointmentLoading.map((item, index) => {
            return <MyAppointmentLoading key={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
