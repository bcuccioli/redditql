import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import { Author } from "./author";
import { AuthorType } from "./author";
import { Subreddit } from "./subreddit";
import { SubredditType } from "./subreddit";

export interface Submission {
  id: string;
  title: string;
  author: Author;
  subreddit: Subreddit;
}

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
      link: {
        type: GraphQLString,
        resolve: (submission) => {
          return (
            `https://old.reddit.com/r/${submission.subreddit.name}` +
            `/comments/${submission.id}`
          );
        },
      },
    }),
  });
