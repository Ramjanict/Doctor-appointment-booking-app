import React from "react";

const MyAppointmentLoading = () => {
  return (
    <div className=" grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-b py-2 ">
      <div>
        <div className=" w-32 h-32 bg-slate-100  animate-pulse"> </div>
      </div>
      <div className="min-w-60 flex flex-col gap-2 flex-1">
        <p className="p-3 bg-slate-100 rounded-full animate-pulse"></p>
        <p className="p-3 bg-slate-100 rounded-full animate-pulse"></p>
        <p className="p-3 bg-slate-100 rounded-full animate-pulse"></p>
        <p className="p-3 bg-slate-100 rounded-full animate-pulse"></p>
      </div>
      <div></div>

      <div className="min-w-20 flex flex-col justify-end gap-2">
        <>
          <p className="p-3 bg-slate-100 rounded-full animate-pulse"></p>
          <p className="p-3 bg-slate-100 rounded-full animate-pulse"></p>
        </>
      </div>
    </div>
  );
};

export default MyAppointmentLoading;
