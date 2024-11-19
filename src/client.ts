import { ZodSchema } from "zod";
import { graphql } from "graphql";
import schema from "./schema/root";

export class RedditQLClient {
  client_id: string;
  client_secret: string;
  refresh_token: string;

  constructor(client_id: string, client_secret: string, refresh_token: string) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.refresh_token = refresh_token;
  }

  async query<T>(q: string, vars = {}, resultSchema: ZodSchema<T>) {
    const result = await graphql({
      schema,
      source: q,
      variableValues: vars,
      contextValue: {
        client_id: this.client_id,
        client_secret: this.client_secret,
        refresh_token: this.refresh_token,
      },
    });
    return resultSchema.parse(result.data);
  }
}
