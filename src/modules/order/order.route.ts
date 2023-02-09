import { FastifyInstance } from "fastify";
import { createOrderHandler, getOrderHandler } from "./order.controller";
import { $ref } from "./order.schema";

async function orderRoutes(server: FastifyInstance) {
  server.post(
    "/check-order",
    {
      schema: {
        body: $ref("createOrderSchema"),
        description: "Check If order requirement can be fulfilled.",
        response: {
          200: {
            ...$ref("orderResponseSchema"),
            description: "Successful response",
          },
        },
        tags: ["Order"],
      },
    },
    createOrderHandler
  );

  server.post(
    "/find-low",
    {
      schema: {
        body: $ref("createOrderSchema"),
        description:
          "Find the lowest at which the order requirement can be fulfilled.",
        response: {
          200: {
            ...$ref("orderResponseSchema"),
            description: "Successful response",
          },
        },
        tags: ["Order"],
      },
    },
    createOrderHandler
  );
}

export default orderRoutes;
