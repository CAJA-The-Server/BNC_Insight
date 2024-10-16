import { ArticleController } from "@/controllers/article-controller";
import { dataSource } from "@/database/data-source";
import { env } from "@/env";
import { authVerifier } from "@/middlewares/auth-verifier";
import { ArticleService } from "@/services/article-service";
import { IMAGE_MIME_TYPES } from "@/utils/constants";
import { Router } from "express";
import multer from "multer";
import path from "path";

export const articleRouter = Router();
const service = new ArticleService(dataSource);
const controller = new ArticleController(service);

articleRouter.get("/:id", (req, res, next) =>
  controller.getOne(req, res).catch(next)
);

articleRouter.get("/", (req, res, next) =>
  controller.getMany(req, res).catch(next)
);

articleRouter.post(
  "/",
  authVerifier,
  multer({
    dest: path.resolve(env.server.uploadTempPath),
    limits: {
      fileSize: env.thumbnail.maxBytes,
    },
    fileFilter(req, file, callback) {
      if (IMAGE_MIME_TYPES.includes(file.mimetype)) callback(null, true);
      else callback(null, false);
    },
  }).single("thumbnail"),
  (req, res, next) => controller.post(req, res).catch(next)
);

articleRouter.patch("/:id", authVerifier, (req, res, next) =>
  controller.patch(req, res).catch(next)
);

articleRouter.delete("/:id", authVerifier, (req, res, next) =>
  controller.delete(req, res).catch(next)
);
