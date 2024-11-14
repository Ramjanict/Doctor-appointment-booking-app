import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppointment,
  loginUser,
  registerUser,
  savePayment,
  stripePayment,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/checkout", authUser, stripePayment);
userRouter.post("/save-payment", savePayment);

userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);

export default userRouter;
