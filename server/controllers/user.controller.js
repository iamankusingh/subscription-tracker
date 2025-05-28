// user authorization
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
