import doctorModel from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// Add doctors API
const addDoctors = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    // check for all data to add doctor

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({
        success: false,
        message: "Missing required details",
      });
    }
    // validing email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter valid email",
      });
    }
    // validing strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }
    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      password: hashPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({
      success: true,
      message: "Doctor Added",
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Admin login api
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Please provide valid credentials",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list

const listAppointmentAdmin = async (req, res) => {
  try {
    const appointmens = await appointmentModel.find({});
    res.json({ success: true, appointmens });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};
// API for canceled Appointment by admin

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    //revome doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    const slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (item) => item !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointmen Calcelled" });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};
// API for admin dashboard  data

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};
export {
  addDoctors,
  loginAdmin,
  allDoctors,
  listAppointmentAdmin,
  appointmentCancel,
  adminDashboard,
};
