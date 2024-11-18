import { createHandler } from "graphql-http/lib/use/express";
import express from "express";
import schema from "./schema/root";

function env(name: string) {
  const value = process.env[name];
  if (value === undefined) {
    console.error(`Missing environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

const app = express();

app.all(
  "/graphql",
  createHandler({
    schema,
    context: async (_req, _res) => {
      return {
        client_id: env("CLIENT_ID"),
        client_secret: env("CLIENT_SECRET"),
        refresh_token: env("TOKEN"),
      };
    },
  })
);

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT });
console.log(`Listening to port ${PORT}...`);
