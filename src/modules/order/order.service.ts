import { FastifyRequest } from "fastify";
import type { CreateOrderSchemaList } from "./order.schema";
import fs from "node:fs/promises";
import { ApparelResponseSchema } from "../apparel/apparel.schema";

export async function checkOrder(
  request: FastifyRequest,
  orders: CreateOrderSchemaList
) {
  const { jsonDbPath } = request.appConfig;

  const dbContent = await fs.readFile(jsonDbPath, "utf-8");
  const dbJson: DB = JSON.parse(dbContent);
  let fulfilled = true;

  for (const order of orders) {
    const apparel = dbJson.apparels.find(
      (apparel) => apparel.code === order.code
    );
    const variants = apparel?.pieces.find((piece) => piece.size === order.size);

    if (order.quantity > variants?.stock!) {
      fulfilled = false;
      break;
    }
  }

  return fulfilled;
}

export async function findCheap(
  request: FastifyRequest,
  orders: CreateOrderSchemaList
) {
  const { jsonDbPath } = request.appConfig;

  const dbContent = await fs.readFile(jsonDbPath, "utf-8");
  const dbJson: DB = JSON.parse(dbContent);
  let price = 0;

  for (const order of orders) {
    const apparel = dbJson.apparels.find(
      (apparel) => apparel.code === order.code
    );
    const variants = apparel?.pieces.find((piece) => piece.size === order.size);

    if (order.quantity <= variants?.stock!) {
      price += order.quantity * variants?.price!;
    } else {
      price = 0;
      break;
    }
  }

  return price;
}

interface DB {
  apparels: ApparelResponseSchema[];
  orders: any[];
}
