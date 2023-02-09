import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  port: +loadEnv("PORT"),
  jsonDbPath: loadEnv("JSON_DB_PATH"),
};

function loadEnv(k: string) {
  const v = process.env[k];

  if (!v) throw new Error(`${k} is required .env variable`);

  return v;
}

declare module "fastify" {
  export interface FastifyInstance {
    appConfig: typeof appConfig;
  }

  export interface FastifyRequest {
    appConfig: typeof appConfig;
  }
}
