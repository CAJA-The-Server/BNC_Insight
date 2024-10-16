import type { User } from "@/database/entities/user";
import "express-session";

declare module "express-session" {
  interface SessionData {
    userUid: User["uid"];
  }
}
