import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAtoken, backendUrl } = useContext(AdminContext);
  const { setDtoken } = useContext(DoctorContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAtoken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dtoken", data.token);
          setDtoken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center  justify-center"
    >
      <div className="flex flex-col gap-3  p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm text-zinc-600 shadow-lg">
        <p className="text-2xl  font-semibold mx-auto">
          <span className="text-primary">{state}</span> Login
        </p>

        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="w-full p-2 border border-zinc-300 rounded mt-1"
            type="email"
            id="email"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="w-full p-2 border border-zinc-300 rounded mt-1"
            type="password"
            id="password"
          />
        </div>
        <button className="w-full bg-primary text-white rounded-md text-base py-2">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?
            <span
              className="text-primary cursor-pointer underline ml-1"
              onClick={() => {
                setState("Doctor");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?
            <span
              className="text-primary cursor-pointer underline ml-1"
              onClick={() => {
                setState("Admin");
              }}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
