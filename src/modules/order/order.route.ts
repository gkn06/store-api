import { FastifyInstance } from "fastify";
import { checkOrderHandler, findCheapOrderHandler } from "./order.controller";
import { $ref } from "./order.schema";

async function orderRoutes(server: FastifyInstance) {
  server.post(
    "/check-order",
    {
      schema: {
        body: $ref("createOrderSchemaList"),
        description: "Check If order requirement can be fulfilled.",
        response: {
          200: {
            ...$ref("checkOrderResponseSchema"),
            description: "Successful response",
          },
        },
        tags: ["Order"],
      },
    },
    checkOrderHandler
  );

  server.post(
    "/find-low",
    {
      schema: {
        body: $ref("createOrderSchemaList"),
        description:
          "Find the lowest at which the order requirement can be fulfilled.",
        response: {
          200: {
            ...$ref("lowCostOrderResponseSchema"),
            description: "Successful response",
          },
        },
        tags: ["Order"],
      },
    },
    findCheapOrderHandler
  );
}

export default orderRoutes;
