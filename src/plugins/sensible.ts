import fp from "fastify-plugin";
import sensible, { SensibleOptions } from "@fastify/sensible";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<SensibleOptions>(async (fastify) => {
  await fastify.register(sensible);
  fastify.addHook("onRequest", async function (this, request) {
    request.to = this.to;
  });
});

declare module "fastify" {
  export interface FastifyRequest {
    to<T>(to: Promise<T>): Promise<SensibleTypes.ToType<T>>;
  }
}
