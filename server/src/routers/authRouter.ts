import {
  getCurrentUserHandler,
  signinHandler,
  signoutHandler,
  signupHandler,
} from "@/controllers/authController";
import { Router } from "express";

export const authRouter = Router();
authRouter.get("/current", getCurrentUserHandler);
authRouter.post("/signup", signupHandler);
authRouter.post("/signin", signinHandler);
authRouter.post("/signout", signoutHandler);
