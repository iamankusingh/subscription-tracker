// routes for subscription
import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getAllSubscription,
  getAUserSubscription,
  createSubscription,
  deleteSubscription,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscription);
subscriptionRouter.get("/user/:id", authorize, getAUserSubscription);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.delete("/:id", authorize, deleteSubscription);
subscriptionRouter.put("/:id", authorize, updateSubscription);

export default subscriptionRouter;
