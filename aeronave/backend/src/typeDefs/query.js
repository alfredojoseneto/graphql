const { gql } = require("apollo-server");

const query = gql`
   type Query {
      aeronaves: [Aeronave]
      aeronave(id: ID!): Aeronave
   }
`;
module.exports = query;
