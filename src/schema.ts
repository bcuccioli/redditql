import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";
import {
  authors,
  subreddits,
  submissions,
  Author,
  Subreddit,
  Submission,
} from "./data";

const AuthorType = new GraphQLObjectType<Author>({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const SubmissionType: GraphQLObjectType = new GraphQLObjectType<Submission>({
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

const SubredditType = new GraphQLObjectType<Subreddit>({
  name: "Subreddit",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    submissions: {
      type: new GraphQLList(SubmissionType),
      resolve: (subreddit) => subreddit.submissions,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    subreddit: {
      type: SubredditType,
      args: { name: { type: GraphQLString } },
      resolve: (_, args: { name: string }) =>
        subreddits.find((subreddit) => subreddit.name === args.name),
    },
    submission: {
      type: SubmissionType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args: { id: string }) =>
        submissions.find((submission) => submission.id === args.id),
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args: { id: string }) =>
        authors.find((author) => author.id === args.id),
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
