import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// connect mongodb and cloudinary
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors({ origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL] }));

// API endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING SUCCESSFULLY");
});

app.listen(port, () => console.log("Server Started", port));
