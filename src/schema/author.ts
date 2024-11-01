import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { AuthoredApi } from "../api/authored";
import { SubmissionType } from "./submission";
import { getSubmissions } from "../api/executor";
import { parseFilter } from "../util/filter";

interface Args {
  limit?: number;
  include?: string;
  exclude?: string[];
}

export interface Author {
  name: string;
}

export const AuthorType = new GraphQLObjectType<Author>({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    submissions: {
      type: new GraphQLList(SubmissionType),
      args: {
        limit: { type: GraphQLInt },
        include: { type: GraphQLString },
        exclude: { type: new GraphQLList(GraphQLString) },
      },
      resolve: async (author, args: Args) => {
        const { limit, include, exclude } = args;
        return await getSubmissions(new AuthoredApi(author.name, limit), {
          includes: parseFilter(include),
          excludes: exclude || [],
        });
      },
    },
  }),
});
