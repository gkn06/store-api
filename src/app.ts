import Fastify from "fastify";
import cors from "@fastify/cors";
import { appConfig } from "./config";
import { orderSchemas } from "./modules/order/order.schema";
import { apparelSchemas } from "./modules/apparel/apparel.schema";
import orderRoutes from "./modules/order/order.route";
import apparelRoutes from "./modules/apparel/apparel.route";
import sensible from "./plugins/sensible";
import swagger from "./plugins/swagger";

async function buildServer() {
  const server = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "SYS:hh:MM:ss",
          ignore: "pid,hostname",
          colorize: true,
        },
      },
    },
  });

  server.decorate("appConfig", appConfig);
  server.addHook("onRequest", async function (this, request) {
    request.appConfig = appConfig;
  });

  await server.register(cors, {
    // put your options here
  });

  for (const schema of [...orderSchemas, ...apparelSchemas]) {
    server.addSchema(schema);
  }

  server.register(sensible);
  server.register(swagger);

  server.register(orderRoutes, { prefix: "order" });
  server.register(apparelRoutes, { prefix: "apparel" });

  server.get("/ping", async (_request, _reply) => {
    return "pong\n";
  });

  return server;
}

export default buildServer;
