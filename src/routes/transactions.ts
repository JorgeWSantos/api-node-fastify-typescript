import { FastifyInstance } from "fastify";
import knex from "../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middleware/check-session-id-exists";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: checkSessionIdExists,
    },
    async (req) => {
      const { sessionId } = req.cookies;

      const transactions = await knex("transactions")
        .where("session_id", sessionId)
        .select("*");

      return { transactions };
    },
  );

  app.get(
    "/:id",
    {
      preHandler: checkSessionIdExists,
    },
    async (req) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getTransactionParamsSchema.parse(req.params);

      const { sessionId } = req.cookies;

      const transaction = await knex("transactions")
        .where({
          session_id: sessionId,
          id,
        })
        .first();

      return { transaction };
    },
  );

  app.get(
    "/summary",
    {
      preHandler: checkSessionIdExists,
    },
    async (req) => {
      const { sessionId } = req.cookies;

      const summary = await knex("transactions")
        .sum("amount", { as: "amount" })
        .where("session_id", sessionId)
        .first();

      return { summary };
    },
  );

  app.post("/", async (req, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { amount, title, type } = createTransactionBodySchema.parse(req.body);

    let sessionId = req.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      amount: type === "credit" ? amount : amount * -1,
      title,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });
}
