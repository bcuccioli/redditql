import RedditQLClient from "./client";
import env from "./util/env";
import { z } from "zod";

const client = new RedditQLClient(
  env("CLIENT_ID"),
  env("CLIENT_SECRET"),
  env("TOKEN")
);

const responseSchema = z.object({
  subreddit: z.object({
    submissions: z.array(
      z.object({
        author: z.object({
          name: z.string(),
        }),
      })
    ),
  }),
});

(async () => {
  const result = await client.query(
    `
    query {
      subreddit(name: "news") {
        submissions(limit: 2) {
          author {
            name
          }
        }
      }
    }
    `,
    {},
    responseSchema
  );
  console.log(JSON.stringify(result, null, 2));
})();
