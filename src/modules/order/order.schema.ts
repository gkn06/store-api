import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

/**
 * Wallet Schemas
 */
const order = {
  id: z.string(),
  name: z.string(),
  date: z.date(),
  balance: z.number(),
};

const createOrderSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  balance: z.number().default(0),
});

const orderResponseSchema = z.object({
  ...order,
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;

export const { schemas: orderSchemas, $ref } = buildJsonSchemas(
  {
    createOrderSchema,
    orderResponseSchema,
  },
  {
    $id: "orderSchemas",
  }
);
