import { FastifyReply, FastifyRequest } from "fastify";
import { CreateOrderSchema } from "./order.schema";
import { createOrder, getOrder } from "./order.service";

export async function createOrderHandler(
  request: FastifyRequest<{
    Body: CreateOrderSchema;
  }>,
  reply: FastifyReply
) {
  const { name, balance = 0 } = request.body;

  if (!name) {
    return reply.code(400).send({
      error: "missing input parameters",
    });
  }

  const [err, order] = await request.to(
    createOrder(request, { name, balance })
  );

  if (err) {
    request.log.error(err, "Error in creating a Order");
    return reply.code(500).send(err);
  }

  return reply.code(200).send(order);
}

export async function getOrderHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const id = request.params.id;

  if (!id) {
    return reply.code(400).send({
      message: "Missing Order id",
    });
  }

  const [err, order] = await request.to(getOrder(request, id));

  if (err) {
    request.log.error(err, `Error in fetching Order with id: ${id}`);
    return reply.code(500).send(err);
  }

  return reply.code(200).send(order);
}
