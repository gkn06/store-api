import { FastifyInstance } from "fastify";
import {
  createApparelHandler,
  UpsertManyApparelHandler,
} from "./apparel.controller";
import { $ref } from "./apparel.schema";

async function apparelRoutes(server: FastifyInstance) {
  server.post(
    "/upsert",
    {
      schema: {
        body: $ref("createApparelSchema"),
        description: "Create New (or) Update Apparel.",
        response: {
          200: {
            ...$ref("apparelResponseSchema"),
            description: "Successful response",
          },
        },
        tags: ["Apparel"],
      },
    },
    createApparelHandler
  );

  server.post(
    "/upsert-many",
    {
      schema: {
        body: $ref("upsertManyApparelSchema"),
        description: "Create New (or) Update multiple Apparel simultaneously.",
        response: {
          200: {
            ...$ref("apparelResponseSchemaList"),
            description: "Successful response",
          },
        },
        tags: ["Apparel"],
      },
    },
    UpsertManyApparelHandler
  );
}

export default apparelRoutes;
