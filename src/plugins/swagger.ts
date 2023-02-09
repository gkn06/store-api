import fp from "fastify-plugin";
import fastifySwagger, { FastifySwaggerOptions } from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";
import { version } from "../../package.json";

export default fp<FastifySwaggerOptions>(async (fastify) => {
  void fastify.register(
    fastifySwagger,
    withRefResolver({
      routePrefix: "/swagger",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Store API",
          description: "API for stores",
          version,
        },
        tags: [
          { name: "Order", description: "Order related end-points" },
          {
            name: "Apparel",
            description: "Apparel related end-points",
          },
        ],
      },
    })
  );
});
