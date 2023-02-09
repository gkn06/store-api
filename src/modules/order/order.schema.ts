import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

/**
 * Order Schemas
 */

const SizeEnum = z.enum(["xs", "s", "m", "l", "xl", "xxl"]);
const createOrderSchema = z.object({
  code: z.string({
    required_error: "code is required",
    invalid_type_error: "code must be a string",
  }),
  size: SizeEnum.default("m"),
  quantity: z.number().default(0),
});

const checkOrderResponseSchema = z.boolean().default(false);
const lowCostOrderResponseSchema = z.number().default(0);
const createOrderSchemaList = z.array(createOrderSchema);

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
export type CreateOrderSchemaList = z.infer<typeof createOrderSchemaList>;
export type CheckOrderResponseSchema = z.infer<typeof checkOrderResponseSchema>;
export type LowCostOrderResponseSchema = z.infer<
  typeof lowCostOrderResponseSchema
>;
export const { schemas: orderSchemas, $ref } = buildJsonSchemas(
  {
    createOrderSchema,
    createOrderSchemaList,
    checkOrderResponseSchema,
    lowCostOrderResponseSchema,
  },
  {
    $id: "orderSchemas",
  }
);
