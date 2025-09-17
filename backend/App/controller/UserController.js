const UserModel = require("../model/userModel");

let insertUser = (req, res) => {
  const { name, email } = req.body;
  try {
    let user = new UserModel({
      name: name,
      email: email,
    });
    user.save();
    if (!user) {
      res.send({
        status: 0,
        message: "User Not Created",
      });
    } else {
      res.send({
        status: 1,
        message: "User Creaded Successfully",
        user: user,
      });
    }
  } catch (err) {
    res.send({
      status: 0,
      message: "Some Thing Wents Wrong",
      error: err,
    });
  }
};

let getAllUser = async (req, res) => {
  let user = await UserModel.find();
  if (user === "" || user === undefined || user === null) {
    res.send({
      status: 0,
      message: "User Not Founded",
    });
  } else {
    res.send({
      status: 1,
      message: "User Founded Successfully",
      user: user,
    });
  }
};

let getSingleUser = async (req, res) => {
  const id = req.params.id;
  let user = await UserModel.findOne({ _id: id });
  if (!user) {
    res.send({
      status: 0,
      message: "User Not Founded",
    });
  } else {
    res.send({
      status: 1,
      message: "User Founded Successfully",
      user: user,
    });
  }
};

let updUser = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const updObject = {
    name: name,
    email: email,
  };
  let user = await UserModel.updateOne({ _id: id }, updObject);
  if (!user) {
    res.send({
      status: 0,
      message: "User Not Founded",
    });
  } else {
    res.send({
      status: 1,
      message: "User Updated Successfully",
      user: user,
    });
  }
};
const mongoose = require("mongoose");

let delUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 0,
        message: "Invalid user ID format",
      });
    }

    const user = await UserModel.deleteOne({ _id: id });

    if (user.deletedCount === 0) {
      return res.status(404).send({
        status: 0,
        message: "User Not Found",
      });
    }

    res.status(200).send({
      status: 1,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 0,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { insertUser, getAllUser, getSingleUser, updUser, delUser };
