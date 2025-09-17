const mongoose = require("mongoose");
let UserModelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

let UserModel = mongoose.model("UserDataCollection", UserModelSchema);
module.exports = UserModel;
