import config from "./config";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schema";

const app = express();
app.all("/graphql", createHandler({ schema }));

app.listen({ port: config().port });
console.log(`Listening to port ${config().port}...`);
