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
import { parseFilter } from "../util/filter";

interface Args {
  limit?: number;
  query?: string;
  include?: string;
  exclude?: string[];
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
        include: { type: GraphQLString },
        exclude: { type: new GraphQLList(GraphQLString) },
      },
      resolve: async (subreddit, args: Args) => {
        const { limit, query, include, exclude } = args;
        const api =
          query !== undefined
            ? new SearchApi(subreddit.name, query, limit)
            : new NewApi(subreddit.name, limit);
        const x = await getSubmissions(api, {
          includes: parseFilter(include),
          excludes: exclude || [],
        });
        return x;
      },
    },
  }),
});
