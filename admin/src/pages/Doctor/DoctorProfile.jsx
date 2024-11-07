import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dtoken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isedit, setIsedit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        name: profileData.name,
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available,
        about: profileData.about,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsedit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="w-full sm:max-w-64 bg-primary/80 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 bg-white border border-stone-100 rounded-lg p-8 py-7">
            <p className="text-3xl font-medium text-gray-700">
              {isedit ? (
                <input
                  className="p-1"
                  type="text"
                  onChange={(e) => {
                    setProfileData((pre) => ({ ...pre, name: e.target.value }));
                  }}
                  value={profileData.name}
                />
              ) : (
                profileData.name
              )}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree}- {profileData.speciality}
              </p>
              <button className="px-2 py-.5 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>
            <div>
              <p className="text-sm text-neutral-800 font-medium mt-3">
                About:
              </p>
              {isedit ? (
                <textarea className="p-2" rows="4" cols="60">
                  {profileData.about}
                </textarea>
              ) : (
                <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                  {profileData.about}
                </p>
              )}
            </div>
            <p className="text-gray-600 mt-4">
              Appointment fees:{" "}
              <span className="text-neutral-800">
                {currency}
                {isedit ? (
                  <input
                    className="p-1"
                    type="number"
                    onChange={(e) => {
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }));
                    }}
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isedit ? (
                  <input
                    className="p-1 mb-1"
                    type="text"
                    onChange={(e) => {
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }));
                    }}
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isedit ? (
                  <input
                    type="text"
                    className="p-1"
                    onChange={(e) => {
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }));
                    }}
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isedit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                id="available"
              />
              <label htmlFor="available">Available</label>
            </div>
            {isedit ? (
              <button
                onClick={() => {
                  updateProfile();
                }}
                className="px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all mt-5"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsedit(true);
                }}
                className="px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all mt-5"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
