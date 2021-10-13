const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    id: { type: GraphQLInt },
    users: { type: GraphQLString },
    createdAt: { type: GraphQLInt },
  }
});

module.exports = MessageType;