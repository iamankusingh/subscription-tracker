// routes for subscriptions
import Subscription from "../models/subscription.model.js";

export const getAllSubscription = async (req, res, next) => {
  try {
    // find all subscriptions from database
    const subscriptions = await Subscription.find();

    // api status code and response
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getAUserSubscription = async (req, res, next) => {
  try {
    // check for owner
    if (req.user.id !== req.params.id) {
      const error = new Error("Your are not the owner of this account");
      res.status(401);
      throw error;
    }

    // find all subscriptions of a user
    const subscription = await Subscription.find({ user: req.params.id });

    if (!subscription) {
      res.status(404).json({ Success: false, message: "Data not found" });
    }

    // console.log("subscription", subscription);

    // api status code and response
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      // req.body is data comming from frontend by forms
      ...req.body,
      user: req.user._id,
    });

    // api status code and response
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    // api status code and response
    res.status(200).json({ success: true, message: "Subscription deleted" });
    // console.log("Deleted subscription with ID:", req.params.id);
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const newSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { ...req.body }
      // { new: true }
    );

    if (!newSubscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    // api status code and response
    res.status(200).json({ success: true, data: newSubscription });
    console.log("Updated subscription with ID:", req.params.id);
  } catch (error) {
    next(error);
  }
};
