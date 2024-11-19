import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Author } from "./author";
import { AuthorType } from "./author";
import { Subreddit } from "./subreddit";
import { SubredditType } from "./subreddit";

export interface Submission {
  id: string;
  title: string;
  author: Author;
  selftext: string;
  subreddit: Subreddit;
  created_utc: number;
}

export const SubmissionType: GraphQLObjectType =
  new GraphQLObjectType<Submission>({
    name: "Submission",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      author: { type: AuthorType },
      selftext: { type: GraphQLString },
      subreddit: { type: SubredditType },
      url: {
        type: GraphQLString,
        resolve: (submission) => {
          return (
            `https://old.reddit.com/r/${submission.subreddit.name}` +
            `/comments/${submission.id}`
          );
        },
      },
      created_utc: { type: GraphQLInt },
    }),
  });
