const { ApolloServer } = require("apollo-server"); //Import Apollo Server
const { importSchema } = require("graphql-import"); //Import graphql to load schema
const EtherDataSource = require("./datasource/ethDatasource"); // custom data
const typeDefs = importSchema("./schema.graphql"); //Load schema

require("dotenv").config(); //Load environment variables

const resolvers = {
  Query: {
    //Resolver to get ether balance
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    //Resolver to get total ether supply
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    //Resolver to get latest ether price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    //Resolver to get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  //Create Apollo Server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), //Instantiate data source
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {
  //Start server on port 9000
  console.log(`🚀 Server ready at ${url}`);
});
