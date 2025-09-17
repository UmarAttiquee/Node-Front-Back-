const {
  insertUser,
  updUser,
  delUser,
  getAllUser,
  getSingleUser,
} = require("../controller/userController");

let express = require("express");
let UserRoutes = express.Router();

UserRoutes.post("/user", insertUser);
UserRoutes.get("/user", getAllUser);
UserRoutes.get("/user/:id", getSingleUser);
UserRoutes.delete("/user/:id", delUser);
UserRoutes.put("/user/:id", updUser);

module.exports = UserRoutes;
