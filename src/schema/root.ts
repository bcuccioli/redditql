import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { AuthorType } from "./author";
import { SubredditType } from "./subreddit";

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
