require("dotenv").config();
const express = require("express");
const { connectToDb } = require("./config/db.config");
const router = require("./routes");

const PORT = process.env.PORT;
connectToDb();

const app = express();
     
app.use(express.json());

app.use("/v1", router);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});