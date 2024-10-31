import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from "graphql";
import { Author, Subreddit, Submission } from "./data";
import { getSubmissions } from "./api/executor";
import { NewApi } from "./api/new";

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
      args: { id: { type: GraphQLID } },
      resolve: (_, _args: { id: string }) => undefined,
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
