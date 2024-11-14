import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdimContextProvider = ({ children }) => {
  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { atoken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availablity",
        { docId },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { atoken },
      });
      if (data.success) {
        setAppointments(data.appointmens);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { atoken },
      });
      if (data.success) {
        setDashboardData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
        getDashboardData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    atoken,
    setAtoken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    getAllAppointments,
    appointments,
    setAppointments,
    cancelAppointment,
    dashboardData,
    getDashboardData,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdimContextProvider;
