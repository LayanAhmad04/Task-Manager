import express from "express"; // build API
import cors from "cors"; // allow frontend to make requests to the backend
import mongoose from "mongoose"; // library to interact w MongoDB
import dotenv from "dotenv"; // environment variables

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health",(req,res) => res.json ({ok:true}));

import authRoutes from ".routes/auth.js";
import taskRoutes from ".routes/tasks.js";
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);

const PORT =process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT,() => console.log('API running on :${PORT'));
    })
    .catch((err) => {
        console.error('MongoDB connection Error: ', err.message);
        process.exit(1);
    });