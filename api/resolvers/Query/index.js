const { GraphQLObjectType } = require('graphql');

const queryUser = require('./user');
const queryPosts = require('./posts');
const queryCategory = require('./category');
const queryGeo = require('./geo');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    // Query one user
    user: queryUser,
    // Query posts
    posts: queryPosts,
    // Query category list
    category: queryCategory,
    // Query geo infos via request ip
    geo: queryGeo,
  }
});

module.exports = Query;