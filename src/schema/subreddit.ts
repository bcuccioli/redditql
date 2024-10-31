import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { NewApi } from "../api/new";
import { SubmissionType } from "./submission";
import { getSubmissions } from "../api/executor";

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
      },
      resolve: async (subreddit, args) => {
        const { limit } = args;
        return await getSubmissions(new NewApi(subreddit.name, limit));
      },
    },
  }),
});
