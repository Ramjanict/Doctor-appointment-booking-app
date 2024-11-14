import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const { atoken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        toast.error("Image not Selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setAbout("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full m-5">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="w-full max-w-4xl max-h-[80vh] overflow-y-scroll bg-white rounded border p-2 sm:p-8">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="docid">
            <img
              className=" bg-slate-100 w-16 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="doit"
            />
          </label>
          <input
            onChange={(e) => {
              setDocImg(e.target.files[0]);
            }}
            type="file"
            id="docid"
            hidden
          />
          <p>
            upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col items-start lg:flex-row gap-10 text-gray-600">
          <div className="w-full flex flex-col lg:flex-1 gap-4">
            <div className=" flex flex-col flex-1 gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className=" flex flex-col flex-1 gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className=" flex flex-col flex-1 gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className=" flex flex-col flex-1 gap-1">
              <p>Experience </p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
              >
                <option value="1 year"> 1 year</option>
                <option value="1 years"> 1 years</option>
                <option value="2 years"> 2 years</option>
                <option value="3 years"> 3 years</option>
                <option value="4 years"> 4 years</option>
                <option value="5 years"> 5 years</option>
                <option value="6 years"> 6 years</option>
                <option value="7 years"> 7 years</option>
                <option value="8 years"> 8 years</option>
                <option value="9years"> 9years</option>
                <option value="10 years">10 years</option>
              </select>
            </div>
            <div className=" flex flex-col flex-1 gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-1 gap-4">
            <div className=" flex flex-col flex-1 gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className=" flex flex-col flex-1 gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className=" flex flex-col flex-1 gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4 mb-2">
          <p>About Doctor</p>
          <textarea
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            value={about}
            className="w-full border rounded px-4 pt-2"
            placeholder="write about doctor"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-10 py-3 mt-4 rounded-full mb-10"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
