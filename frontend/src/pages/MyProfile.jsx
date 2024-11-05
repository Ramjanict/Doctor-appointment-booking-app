import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);
  const [image, setImage] = useState(false);
  const [isedit, setIsedit] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      //if user change profile
      image && formData.append("image", image);

      console.log("formData", formData);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsedit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };
  return (
    userData && (
      <div className=" max-w-lg flex flex-col gap-2 text-sm">
        {isedit ? (
          <label htmlFor="image">
            <div className=" inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className=" absolute bottom-12 right-12 w-10 rounded"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>

            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 rounded"
            src={userData.image}
            alt="user profile"
          />
        )}

        {isedit ? (
          <input
            className="max-w-60 bg-gray-50 text-3xl font-medium mt-4"
            type="text"
            value={userData.name}
            onChange={(e) => {
              setUserData((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
        ) : (
          <p className="text-neutral-800 text-3xl font-medium mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className=" uppercase text-neutral-500 underline mt-3">
            contact information
          </p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className=" font-medium">Email Id:</p>
            <p className=" text-blue-500">{userData.email}</p>
            <p className=" font-medium">Phone:</p>
            {isedit ? (
              <input
                className=" max-w-52 bg-gray-100 p-1 rounded"
                type="text"
                value={userData.phone}
                onChange={(e) => {
                  setUserData((pre) => {
                    return { ...pre, phone: e.target.value };
                  });
                }}
              />
            ) : (
              <p className=" text-blue-400">{userData.phone}</p>
            )}
            <p className=" font-medium">Address:</p>
            {isedit ? (
              <p>
                <input
                  className=" bg-gray-50 p-1 rounded mb-1"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) => {
                    setUserData((pre) => {
                      return {
                        ...pre,
                        address: { ...pre.address, line1: e.target.value },
                      };
                    });
                  }}
                />
                <br />
                <input
                  className=" bg-gray-50 p-1 rounded"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) => {
                    setUserData((pre) => {
                      return {
                        ...pre,
                        address: { ...pre.address, line2: e.target.value },
                      };
                    });
                  }}
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1} <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="uppercase text-neutral-500 underline mt-3">
            basic information
          </p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className=" font-medium">Gender:</p>
            {isedit ? (
              <select
                className="max-w-28 bg-gray-100 rounded"
                onChange={(e) => {
                  setUserData((pre) => {
                    return {
                      ...pre,
                      gender: e.target.value,
                    };
                  });
                }}
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className=" font-medium">Birthday:</p>
            {isedit ? (
              <input
                className="max-w-24 bg-gray-100 rounded"
                type="date"
                onChange={(e) => {
                  setUserData((pre) => {
                    return {
                      ...pre,
                      dob: e.target.value,
                    };
                  });
                }}
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isedit ? (
            <button
              className=" border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all "
              onClick={updateUserProfileData}
            >
              Save information
            </button>
          ) : (
            <button
              className=" border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => {
                setIsedit(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
