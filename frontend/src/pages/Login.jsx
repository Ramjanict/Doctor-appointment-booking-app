import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center  justify-center"
    >
      <div className="flex flex-col gap-3  p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm text-zinc-600 shadow-lg">
        <p className="text-2xl  font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <label htmlFor="name">Full Name</label>
            <input
              className="w-full p-2 border border-zinc-300 rounded mt-1"
              type="text"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            className="w-full p-2 border border-zinc-300 rounded mt-1"
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
        </div>
        <div className=" w-full">
          <label htmlFor="password">Password</label>
          <input
            className="w-full p-2 border border-zinc-300 rounded mt-1"
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white rounded-md text-base py-2"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-primary cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-primary cursor-pointer underline"
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
