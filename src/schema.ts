import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
} from "graphql";
import { Author, Subreddit, Submission } from "./data";
import { AuthoredApi } from "./api/authored";
import { NewApi } from "./api/new";
import { getSubmissions } from "./api/executor";

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

const AuthorType = new GraphQLObjectType<Author>({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    submissions: {
      type: new GraphQLList(SubmissionType),
      args: {
        limit: { type: GraphQLInt },
      },
      resolve: async (author, args) => {
        const { limit } = args;
        return await getSubmissions(new AuthoredApi(author.name, limit));
      },
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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    subreddit: {
      type: SubredditType,
      args: { name: { type: GraphQLString } },
      resolve: (_, args: { name: string }) => ({ name: args.name }),
    },
    author: {
      type: AuthorType,
      args: { name: { type: GraphQLString } },
      resolve: (_, args: { name: string }) => ({ name: args.name }),
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
