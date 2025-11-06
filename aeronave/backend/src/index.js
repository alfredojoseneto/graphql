require("dotenv").config();

const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express").default;

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// Database - lendo o arquivo .env
const db = {
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   pass: process.env.DB_PASS,
   name: process.env.DB_NAME,
};

// MongoDB connection URI with authentication
const dbUri = `mongodb://${db.user}:${db.pass}@${db.host}/${db.name}?authSource=admin`;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
   .connect(dbUri, dbOptions)
   .then(() => console.log("Database connected"))
   .catch((error) => console.log("Databased failed: ", error));

// Express App
const app = express();

// GraphQL Server Configuration
const server = new ApolloServer({ 
   typeDefs, 
   resolvers,
   introspection: true,
   csrfPrevention: false,
});

// Start server
async function startServer() {
   await server.start();
   server.applyMiddleware({ app, path: '/graphql' });
   
   // GraphQL Playground route
   app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
   
   const PORT = 4000;
   app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
      console.log(`🎮 GraphQL Playground at http://localhost:${PORT}/playground`);
      console.log(`📊 Database connected successfully`);
   });
}

startServer().catch((error) => console.log("Server failed: ", error));
