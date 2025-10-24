import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import corsOptions from "./config/corsOptions.js";
import productRouter from "./routes/productRoutes.js";
import leadRouter from "./routes/leadRouter.js";
import followUpRouter from "./routes/followUpRoutes.js";
import quotationRouter from "./routes/quotationRouter.js";
import invoiceRouter from "./routes/invoiceRoutes.js";
import orderRouter from "./routes/orderRouter.js";
import targetRouter from "./routes/targetRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import indiaMartRouter from "./routes/indiaMartRoutes.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

// Serve static files from public directory
//app.use('/public', express.static(path.join(__dirname, '../public')));

app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/lead", leadRouter);
app.use("/api/followUp", followUpRouter);
app.use("/api/quotation", quotationRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/order", orderRouter);
app.use("/api/target", targetRouter);
app.use("/api/indiaMart", indiaMartRouter);

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

export default app;
