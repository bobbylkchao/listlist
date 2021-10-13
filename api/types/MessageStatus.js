const { GraphQLObjectType, GraphQLInt } = require('graphql');

const MessageStatusType = new GraphQLObjectType({
  name: 'MessageStatus',
  fields: {
    id: { type: GraphQLInt },
    messageID: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    hideStatus: { type: GraphQLInt },
  }
});

module.exports = MessageStatusType;