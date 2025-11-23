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
import notifyRouter from "./routes/notificationRoutes.js";
import requestLogger from "./middlewares/requestLogger.js";
import logger from "./utils/logger.js";
import requestId from "./middlewares/requestId.js";
import { parseErrorStack } from "./utils/parseStack.js";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(requestId);
app.use(requestLogger);

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
app.use("/api/notify", notifyRouter);

app.get("/api/test", (req, res) => {
  logger.info("Test API executed successfully");
  res.json({ message: "Hello from backend!" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  
  const { FilePath, MethodName, LineNumber } = parseErrorStack(err.stack);
  console.log(err);
  logger.error("Unhandled Error", {
    ErrorMessage: err.message,
    StackTrace: err.stack,
    FilePath: FilePath || null,
    MethodName: MethodName || null,
    LineNumber: LineNumber || null,
    RequestId: req.id,
    RequestUrl: req.originalUrl,
    RequestMethod: req.method,
    RequestBody: req.body,
    ResponseStatus: 500,
    UserId: req?.user?.id || null,
    AdditionalData: err.additionalData || null,
  });

  res.status(500).json({ message: "Internal Server Error", requestId: req.id });
});


export default app;
