import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Author } from "../data";
import { AuthoredApi } from "../api/authored";
import { SubmissionType } from "./submission";
import { getSubmissions } from "../api/executor";

export const AuthorType = new GraphQLObjectType<Author>({
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
