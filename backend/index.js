const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./App/route/UserRoute");
const UserModel = require("./App/model/userModel");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.URL).then(() => {
  console.log("Connecction Made Successfully");
  app.listen(process.env.PORT);
});

app.use("/api/web", UserRoutes);
