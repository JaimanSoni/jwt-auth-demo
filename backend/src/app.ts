require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./config/db.config");
const router = require("./routes");
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
connectToDb();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/v1", router);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});