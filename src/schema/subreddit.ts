import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { NewApi } from "../api/new";
import { SearchApi } from "../api/search";
import { SubmissionType } from "./submission";
import { getSubmissions } from "../api/executor";

interface Args {
  limit?: number;
  query?: string;
}

export interface Subreddit {
  name: string;
}

export const SubredditType = new GraphQLObjectType<Subreddit>({
  name: "Subreddit",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    submissions: {
      type: new GraphQLList(SubmissionType),
      args: {
        limit: { type: GraphQLInt },
        query: { type: GraphQLString },
      },
      resolve: async (subreddit, args: Args) => {
        const { limit, query } = args;
        const api =
          query !== undefined
            ? new SearchApi(subreddit.name, query, limit)
            : new NewApi(subreddit.name, limit);
        return await getSubmissions(api);
      },
    },
  }),
});
