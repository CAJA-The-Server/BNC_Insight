import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { NODE_ENV } from "./utils/node-env";

const developmentEnvPath = path.resolve(".env.development");
const productionEnvPath = path.resolve(".env.production");

const envSchema = z
  .object({
    SERVER_URL: z.string(),
    SERVER_PORT: z.coerce.number(),
    SERVER_SESSION_SECRET: z.string(),

    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.coerce.number(),
    DATABASE_NAME: z.string(),
    DATABASE_CONNECTION_LIMIT: z.coerce.number(),
  })
  .readonly();

export const env = await (async () => {
  const envPath =
    NODE_ENV === "development" ? developmentEnvPath : productionEnvPath;
  try {
    const rawEnv = await fs.readFile(envPath, "utf8");
    const parsedEnv = dotenv.parse(rawEnv);
    try {
      return await envSchema.parseAsync(parsedEnv);
    } catch {
      return Promise.reject(new Error(`\`${envPath}\` is not valid`));
    }
  } catch {
    return Promise.reject(new Error(`Failed to read \`${envPath}\``));
  }
})();
