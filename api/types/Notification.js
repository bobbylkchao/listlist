const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const NotificationType = new GraphQLObjectType({
  name: 'Notification',
  fields: {
    id: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    icon: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    pushStatus: { type: GraphQLInt },
    readStatus: { type: GraphQLInt },
    createdAt: { type: GraphQLInt },
  }
});

module.exports = NotificationType;