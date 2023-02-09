import { FastifyReply, FastifyRequest } from "fastify";
import { CreateApparelSchema, UpsertManyApparelSchema } from "./apparel.schema";
import { createApparel, UpsertApparel } from "./apparel.service";

export async function createApparelHandler(
  request: FastifyRequest<{
    Body: CreateApparelSchema;
  }>,
  reply: FastifyReply
) {
  const { name, code, pieces } = request.body;

  if (!name || !code) {
    return reply.code(400).send({
      error: "missing input parameters",
    });
  }

  const [err, apparel] = await request.to(
    createApparel(request, { name, code, pieces })
  );

  if (err) {
    request.log.error(err, "Error in upserting a apparel");
    return reply.code(500).send(err);
  }

  return reply.code(200).send(apparel);
}

export async function UpsertManyApparelHandler(
  request: FastifyRequest<{
    Body: UpsertManyApparelSchema;
  }>,
  reply: FastifyReply
) {
  const inputs = request.body;

  if (
    !inputs.every((input) => input.name) ||
    !inputs.every((input) => input.code)
  ) {
    return reply.code(400).send({
      error: "missing input parameters",
    });
  }

  const [err, apparels] = await request.to(UpsertApparel(request, inputs));

  if (err) {
    request.log.error(err, "Error in upserting apparels");
    return reply.code(500).send(err);
  }

  return reply.code(200).send(apparels);
}
