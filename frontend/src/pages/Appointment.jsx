import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

const Appointment = () => {
  const { doctors, getDoctorData, currencySymbol, backendUrl, token } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  //doctors info fetch
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting current date with index
      let currentDate = new Date(today);

      currentDate.setDate(today.getDate() + i);

      //setting end time of date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hour
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(30);
      }
      let timeSlots = [];

      while (currentDate < endTime) {
        let formatedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formatedTime;

        const isSlotAvialable =
          docInfo?.slots_booked[slotDate] &&
          docInfo?.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvialable) {
          //time slot array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formatedTime,
          });
        }

        // increment time 30 plus
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotTime, slotDate },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);
  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4 ">
          <div>
            <img
              className="w-full sm:max-w-72 bg-primary rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="icon" />
            </p>
            <div className="flex items-center gap-2 sm:gap-1 md:gap-2  text-gray-600 mt-1">
              {docInfo.degree} - {docInfo.speciality}
              <button className="px-2 py.5 border rounded-full text-xs">
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img className="w-3" src={assets.info_icon} alt="icon" />
              </p>
              <p className="text-gray-500 text-sm max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500  font-medium mt-4">
              Appointment fee:
              <span className="text-gray-600 ml-1">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 sm:mt-4 text-gray-700 font-medium">
          <p>Booking slots</p>
          <div className="w-full flex items-center gap-3 mt-4 overflow-x-scroll lg:overflow-x-auto lg:scrollbar">
            {docSlots.length &&
              docSlots.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setSlotIndex(index);
                    }}
                    className={`min-w-16 py-6 rounded-full text-center cursor-pointer ${
                      slotIndex === index
                        ? "bg-primary text-white"
                        : " border border-gray-200"
                    }`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>

          <div className="w-full flex items-center  gap-3 mt-4 transition-all ease-in-out  duration-500  overflow-x-scroll lg:overflow-x-auto lg:scrollbar ">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => {
                return (
                  <p
                    onClick={() => {
                      setSlotTime(item.time);
                    }}
                    className={`flex-shrink-0 px-5 py-3 rounded-full text-sm font-light cursor-pointer  ${
                      item.time === slotTime
                        ? "bg-primary text-white"
                        : "text-gray-400 border border-gray-300"
                    }`}
                    key={index}
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
          </div>

          <button
            onClick={bookAppointment}
            className="text-sm text-white font-light bg-primary  px-14 py-3 rounded-full mt-4 "
          >
            Book an appointment
          </button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
