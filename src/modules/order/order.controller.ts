import { FastifyReply, FastifyRequest } from "fastify";
import { CreateOrderSchemaList } from "./order.schema";
import { checkOrder, findCheap } from "./order.service";

export async function checkOrderHandler(
  request: FastifyRequest<{
    Body: CreateOrderSchemaList;
  }>,
  reply: FastifyReply
) {
  const orders = request.body;

  if (!orders.every((order) => order.code)) {
    return reply.code(400).send({
      error: "missing input parameters",
    });
  }

  const [err, order] = await request.to(checkOrder(request, orders));

  if (err) {
    request.log.error(err, "Error in checking the order eligibility");
    return reply.code(500).send(err);
  }

  return reply.code(200).send(order);
}

export async function findCheapOrderHandler(
  request: FastifyRequest<{
    Body: CreateOrderSchemaList;
  }>,
  reply: FastifyReply
) {
  const orders = request.body;

  if (!orders.every((order) => order.code)) {
    return reply.code(400).send({
      error: "missing input parameters",
    });
  }

  const [err, order] = await request.to(findCheap(request, orders));

  if (err) {
    request.log.error(err, "Error in checking the order eligibility");
    return reply.code(500).send(err);
  }

  return reply.code(200).send(order);
}
