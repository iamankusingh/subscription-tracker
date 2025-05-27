// routes for authentication user (sign-up, sign-in, sign-out)
import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

// authRouter.post("/sign-up", (req, res, next) => {
//     res.send("sign up");
// });
// authRouter.post("/sign-in", (req, res, next) => {
//   res.send("sign in");
// });
// authRouter.post("/sign-out", (req, res, next) => {
//   res.send("sign out");
// });

export default authRouter;
