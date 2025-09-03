import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

export default app;
