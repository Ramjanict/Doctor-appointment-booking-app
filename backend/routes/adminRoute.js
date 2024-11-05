import express from "express";
import upload from "../middlewares/multer.js";
import {
  addDoctors,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  listAppointmentAdmin,
  loginAdmin,
} from "../controllers/adminController.js";
import authAdnin from "../middlewares/authAdnin.js";
import { changeAvailability } from "../controllers/doctorController.js";
const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdnin, upload.single("image"), addDoctors);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdnin, allDoctors);
adminRouter.post("/change-availablity", authAdnin, changeAvailability);
adminRouter.get("/appointments", authAdnin, listAppointmentAdmin);
adminRouter.post("/cancel-appointment", authAdnin, appointmentCancel);
adminRouter.get("/dashboard", authAdnin, adminDashboard);

export default adminRouter;
