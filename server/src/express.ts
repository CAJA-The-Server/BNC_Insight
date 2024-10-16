import { TypeormStore } from "connect-typeorm";
import Express, { ErrorRequestHandler } from "express";
import session from "express-session";
import { dataSource } from "./database/data-source";
import { Session } from "./database/entities/session";
import { env, isProduction } from "./env";
import { apiRouter } from "./routers/api-router";
import { safeRequestHandler } from "./utils/async-request-handler";
import { logger } from "./utils/logger";

export const express = Express();

express.use(
  session({
    secret: env.server.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 1000,
    },
    store: new TypeormStore().connect(dataSource.getRepository(Session)),
  })
);

express.use("/api", apiRouter);

if (isProduction) {
  express.use(
    "*",
    safeRequestHandler((req, res) => {
      // TODO
      res.status(200).end();
    })
  );
}

express.use(((err, req, res, next) => {
  logger.error(err);
  res.status(500).end();
}) satisfies ErrorRequestHandler);
