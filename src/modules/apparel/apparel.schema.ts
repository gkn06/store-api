import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

/**
 * Wallet Schemas
 */
const SizeEnum = z.enum(["xs", "s", "m", "l", "xl", "xxl"]);
const Quality = z.enum(["I", "II", "III"]);

const variants = z.object({
  price: z.number().default(0),
  stock: z.number().default(0),
  size: SizeEnum.default("m"),
  quality: Quality.default("II"),
});

const apparel = {
  id: z.string(),
  code: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  pieces: z.array(variants),
};

const createApparelSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  code: z.string({
    required_error: "Code is required",
    invalid_type_error: "Code must be a string",
  }),
  pieces: z.array(variants),
});

const upsertManyApparelSchema = z.array(createApparelSchema);

const apparelResponseSchema = z.object({
  ...apparel,
});

const apparelResponseSchemaList = z.array(apparelResponseSchema);

export type CreateApparelSchema = z.infer<typeof createApparelSchema>;
export type ApparelResponseSchema = z.infer<typeof apparelResponseSchema>;
export type UpsertManyApparelSchema = z.infer<typeof upsertManyApparelSchema>;
export type ApparelResponseSchemaList = z.infer<
  typeof apparelResponseSchemaList
>;

export const { schemas: apparelSchemas, $ref } = buildJsonSchemas(
  {
    createApparelSchema,
    apparelResponseSchema,
    upsertManyApparelSchema,
    apparelResponseSchemaList,
  },
  {
    $id: "apparelSchemas",
  }
);
