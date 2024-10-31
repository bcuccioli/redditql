import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { AuthorType } from "./author";
import { Submission } from "../data";
import { SubredditType } from "./subreddit";

export const SubmissionType: GraphQLObjectType =
  new GraphQLObjectType<Submission>({
    name: "Submission",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve: (submission) => submission.author,
      },
      subreddit: {
        type: SubredditType,
        resolve: (submission) => submission.subreddit,
      },
    }),
  });
