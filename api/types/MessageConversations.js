const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const MessageConversationsType = new GraphQLObjectType({
  name: 'MessageConversations',
  fields: {
    id: { type: GraphQLInt },
    messageID: { type: GraphQLInt },
    postID: { type: GraphQLInt },
    fromUserID: { type: GraphQLInt },
    toUserID: { type: GraphQLInt },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLInt },
  }
});

module.exports = MessageConversationsType;