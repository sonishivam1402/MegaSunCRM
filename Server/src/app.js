import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import corsOptions from "./config/corsOptions.js";
import productRouter from "./routes/productRoutes.js";
import leadRouter from "./routes/leadRouter.js";
import followUpRouter from "./routes/followUpRoutes.js";
import quotationRouter from "./routes/quotationRouter.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/lead", leadRouter);
app.use("/api/followUp", followUpRouter);
app.use("/api/quotation", quotationRouter);
app.use("/api/invoice", invoiceRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

export default app;
