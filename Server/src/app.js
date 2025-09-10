import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import corsOptions from "./config/corsOptions.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

export default app;
