require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDb } from "./config/db.config";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const PORT = process.env.PORT || 5000;
connectToDb();

const app = express();

const NODE_ENV = process.env.NODE_ENV;

app.use(
  cors({
    origin:
      NODE_ENV === "development"
        ? process.env.LOCAL_CLIENT_URL || "http://localhost:5173"
        : process.env.HOSTED_CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/v1", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
