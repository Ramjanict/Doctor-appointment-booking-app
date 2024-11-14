import React from "react";

const DoctorLoading = () => {
  return (
    <div className="max-w-56 rounded-xl  overflow-hidden bg-slate-100">
      <div className="bg-slate-200 w-80 h-52 animate-pulse "> </div>
      <div className="flex flex-col gap-2 w-[80%] mx-auto py-4">
        <p className="bg-slate-200 p-3 rounded-full animate-pulse "></p>
        <p className="bg-slate-200 p-3 rounded-full animate-pulse "></p>
        <p className="bg-slate-200 p-3 rounded-full animate-pulse"></p>
      </div>
    </div>
  );
};

export default DoctorLoading;
