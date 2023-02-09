import { FastifyRequest } from "fastify";
import type {
  CreateApparelSchema,
  ApparelResponseSchema,
  UpsertManyApparelSchema,
} from "./apparel.schema";
import fs from "node:fs/promises";

export async function createApparel(
  request: FastifyRequest,
  input: CreateApparelSchema
) {
  const { jsonDbPath } = request.appConfig;

  const dbContent = await fs.readFile(jsonDbPath, "utf-8");
  const dbJson: DB = JSON.parse(dbContent);

  const apparel = upsert(input, dbJson);

  await fs.writeFile(request.appConfig.jsonDbPath, JSON.stringify(dbJson));
  return apparel;
}

export async function UpsertApparel(
  request: FastifyRequest,
  inputs: UpsertManyApparelSchema
) {
  const { jsonDbPath } = request.appConfig;
  const dbContent = await fs.readFile(jsonDbPath, "utf-8");
  const dbJson: DB = JSON.parse(dbContent);

  const upserted = [];

  for (const input of inputs) {
    const apparel = upsert(input, dbJson);
    upserted.push(apparel);
  }

  await fs.writeFile(request.appConfig.jsonDbPath, JSON.stringify(dbJson));
  return upserted;
}

function upsert(input: CreateApparelSchema, dbJson: DB): ApparelResponseSchema {
  const { code, pieces, name } = input;
  let apparel: ApparelResponseSchema = {
    id: Math.random().toString(36).slice(-6),
    code,
    name,
    pieces,
    createdAt: new Date(),
  };

  const apparelIndex = dbJson.apparels.findIndex(
    (apparel) => apparel.code === code
  );

  if (apparelIndex > -1) {
    apparel = dbJson.apparels[apparelIndex];

    for (const piece of pieces) {
      const pieceIndex = apparel.pieces.findIndex((p) => p.size === piece.size);
      if (pieceIndex > -1) {
        apparel.pieces[pieceIndex].quality = piece.quality;
        apparel.pieces[pieceIndex].price = piece.price;
        apparel.pieces[pieceIndex].stock = piece.stock;
      } else {
        apparel.pieces = [...apparel.pieces, piece];
      }
    }

    apparel.updatedAt = new Date();
  } else {
    dbJson.apparels = [...dbJson.apparels, apparel];
  }

  return apparel;
}

interface DB {
  apparels: ApparelResponseSchema[];
  orders: any[];
}
