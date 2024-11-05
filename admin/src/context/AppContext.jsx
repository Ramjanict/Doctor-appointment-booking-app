import React, { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
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
  const calculateAge = (dob) => {
    const today = new Date();
    const birthday = new Date(dob);
    let age = today.getFullYear() - birthday.getFullYear();
    return age;
  };

  const sloteDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const currency = "$";
  const value = { calculateAge, sloteDateFormate, currency };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
