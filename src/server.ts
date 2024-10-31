import config from "./config";
import { createHandler } from "graphql-http/lib/use/express";
import express from "express";
import schema from "./schema/root";

const app = express();
app.all("/graphql", createHandler({ schema }));

app.listen({ port: config().port });
console.log(`Listening to port ${config().port}...`);
