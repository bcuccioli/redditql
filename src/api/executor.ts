import Api from "./api";
import Context from "../context";
import { FilterArgs, passesFilter } from "../util/filter";
import { Submission } from "../schema/submission";
import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { getAccessToken } from "./token";
import { z } from "zod";

const ApiResultSchema = z.object({
  data: z.object({
    data: z.object({
      children: z.array(
        z.object({
          data: z.object({
            id: z.string(),
            title: z.string(),
            author: z.string(),
            selftext: z.string(),
            subreddit: z.string(),
            url: z.string(),
            created_utc: z.number(),
          }),
        })
      ),
      after: z.string().nullable(),
    }),
  }),
});

async function genPage(api: Api, context: Context, cursor: string | null) {
  const axiosInstance = axios.create();

  axiosRetry(axiosInstance, {
    retries: 10,
    retryDelay: (_) => {
      return 5000;
    },
    retryCondition: (error: AxiosError) => {
      return error.response !== undefined && error.response.status >= 400;
    },
  });

  const token = await getAccessToken(context);

  const response = await axiosInstance.get(api.uri(cursor), {
    headers: {
      Authorization: `bearer ${token}`,
      "User-Agent": "redditql",
    },
  });

  const apiResponse = ApiResultSchema.parse(response);

  const page = {
    edges: apiResponse.data.data.children.map((c) => c.data),
    cursor: apiResponse.data.data.after,
  };

  // This will lead to an infinite loop, unless we do not have a next page.
  // (This function is called with a null cursor only the first time.)
  if (page.cursor === cursor && page.cursor !== null) {
    throw new Error(`Cursor was not updated: ${cursor}`);
  }

  return page;
}

export async function getSubmissions(
  api: Api,
  context: Context,
  filter: FilterArgs
) {
  let cursor: string | null = null;

  let submissions: Submission[] = [];

  while (true) {
    const page = await genPage(api, context, cursor);

    const submissionEdges = page.edges.map((e) => ({
      id: e.id,
      title: e.title,
      author: { name: e.author },
      subreddit: { name: e.subreddit },
    }));

    const filtered = submissionEdges.filter(
      (e) => e.author.name !== "[deleted]" && passesFilter(filter, e.title)
    );

    submissions = submissions.concat(filtered);

    if (submissions.length >= api.limit) {
      break;
    }

    if (page.cursor === null) {
      break;
    }

    // Set the updated cursor and iterate.
    cursor = page.cursor;
  }

  // We may have received more than `limit` results from subsequent `genPage`
  // calls, in which case we need to slice again here.
  return submissions.slice(0, api.limit);
}
