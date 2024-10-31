import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
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
      resolve: async (author) => {
        return await getSubmissions(new AuthoredApi(author.name));
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
      resolve: async (subreddit) => {
        return await getSubmissions(new NewApi(subreddit.name));
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
