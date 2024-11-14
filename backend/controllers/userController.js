import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//ApI for register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing required information",
      });
    }
    //validating email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please provide valid email",
      });
    }
    //validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please provide minimum 8 characters",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = { name, email, password: hashPassword };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};

//API for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exsit" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};

//API for to get user profile
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};

//API for profile update
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, gender, dob } = req.body;
    const imageFile = req.file;
    if ((!name, !phone, !address, !gender, !dob)) {
      return res.json({ success: false, message: "Required data missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      gender,
      dob,
    });
    if (imageFile) {
      //upload image cloudinary

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotTime, slotDate } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      res.json({ success: false, message: "Doctor not available" });
    }
    const slots_booked = docData.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } //slot is free
      else {
        slots_booked[slotDate].push(slotTime);
      }
    } //when all slot is free
    else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();
    //new slot in data in doctor data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user Appointment lists

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointmens = await appointmentModel.find({ userId });
    res.json({ success: true, appointmens });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};

// API for canceled Appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
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

const stripePayment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancel or not found",
      });
    }
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: appointmentData.userData.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: appointmentData.amount * 100,
            product_data: {
              name: appointmentData.docData.name,
              description: appointmentData.docData.about,
              images: [appointmentData.docData.image],
              metadata: { appointmentId: appointmentId },
            },
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });
    res.json({ session });
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};
const savePayment = async (req, res) => {
  try {
    const { session_id } = req.body;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("session", session);
    if (!session.payment_status === "unpaid") {
      return res.json({ session, message: "payment successfull" });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  stripePayment,
  savePayment,
};
