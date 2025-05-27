// routes for subscription
import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getAllSubscription,
  createSubscription,
  getAUserSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscription);

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET subscriptions details" });
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE subscriptions" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE subscriptions" });
});

subscriptionRouter.get("/user/:id", authorize, getAUserSubscription);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "Cancel subscriptions" });
});

subscriptionRouter.put("/upcomming-renewals", (req, res) => {
  res.send({ title: "GET upccing renewals" });
});

export default subscriptionRouter;
