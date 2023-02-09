import { FastifyRequest } from "fastify";
// import { Wallet } from "../../entities/Wallet";
import type { CreateOrderSchema } from "./order.schema";

export async function createOrder(
  request: FastifyRequest,
  input: CreateOrderSchema
) {
  const { balance, name } = input;

  // const em = request.orm.em.fork();

  // const Order = em.create(Order, {
  //   balance: parseFloat(balance.toFixed(4)),
  //   name,
  // });

  // await em.persistAndFlush(Order);
  // return Order;
}

export async function getOrder(request: FastifyRequest, id: string) {
  // const em = request.orm.em.fork();
  // const Order = await em.findOneOrFail(Order, { id });
  // return Order;
}
