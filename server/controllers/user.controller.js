// user authorization
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    // find all users from database
    const users = await User.find();

    // api status code and response
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getAUser = async (req, res, next) => {
  try {
    // find specefic user from database by id from params
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // api status code and response
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // hast the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      password: hashPassword,
    });

    if (!updatedUser) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }

    // api status code and response
    res.status(200).json({ success: true, data: updatedUser });
    console.log("Updated user with ID:", req.params.id);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    // api status code and response
    res.status(200).json({ success: true, message: "User deleted" });
    console.log("Deleted user with ID:", req.params.id);
  } catch (error) {
    next(error);
  }
};
