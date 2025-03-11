const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { ApolloServer } = require("apollo-server-express");
const app = express();

const {
  connectDB,
  initData,
  getDbIssueList,
  getNextSequence,
  insertDbIssue,
} = require("./db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 2000;

const schema = `
scalar GraphQLDate

type Issue {
  id: Int!
  title: String!
  status: String!
  owner: String
  effort: Int
  created: GraphQLDate!
}

##### Top level declarations
type Query {
  about: String!
  issueList: [Issue!]!
}
    
type Mutation {
  setAboutMessage(message: String!): String
  addIssue(issue: AddIssueInput!): Issue
}

input AddIssueInput {
  title: String!
  owner: String!
  status: String!
  effort: Int
  created: GraphQLDate!
}
`;

let defaultAboutMsg = "Issue Tracker API v1.0";

const resolvers = {
  Query: {
    about: () => defaultAboutMsg,
    issueList: () => getDbIssueList(),
  },
  Mutation: {
    setAboutMessage: (_, { message }) => {
      defaultAboutMsg = message;
      return defaultAboutMsg;
    },
    addIssue: async (_, { issue }) => {
      issue.id = await getNextSequence("issues");
      await insertDbIssue(issue);
      return issue;
    },
  },
};

async function startServer() {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs: schema,
      resolvers: resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
