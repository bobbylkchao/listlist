const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');
const { dbQuery } = require('../database');
const UserType = require('./User');
const PostImageType = require('./PostImage');

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: "Post model",
  fields:() => (
    {
      id: {
        type: GraphQLInt,
        description: "Post ID.",
      },
      country: {
        type: GraphQLString,
        description: "Publisher's country",
      },
      region: {
        type: GraphQLString,
        description: "Publisher's region",
      },
      city: {
        type: GraphQLString,
        description: "Publisher's city",
      },
      userID: {
        type: GraphQLInt,
        description: "The id of the user of the post.",
      },
      categoryID: {
        type: GraphQLInt,
        description: "Post category id.",
      },
      adtype: {
        type: GraphQLInt,
        description: "Type of the post, eg. 1: offer, 2: wanna find.",
      },
      forsaleby: {
        type: GraphQLInt,
        description: "User type of the post, eg. 1: owner, 2:business.",
      },
      title: {
        type: GraphQLString,
        description: "Post title.",
      },
      description: {
        type: GraphQLString,
        description: "Post description.",
      },
      price: {
        type: GraphQLInt,
        description: "Price type of post, eg. 1: hasPrice 2: bid/auction 3:free 4:please contact 5:swpe/trade.",
      },
      price_value: {
        type: GraphQLInt,
        description: "Value of price.",
      },
      address: {
        type: GraphQLString,
        description: "User's address.",
      },
      fulfillment: {
        type: GraphQLString,
        description: "Fulfillment options, 1:Willing to drop-off / deliver 2:Willing to ship the item 3:Offer curbside pick up.",
      },
      cashless_pay: {
        type: GraphQLInt,
        description: "If is 1, means can offer cashless payment.",
      },
      condition: {
        type: GraphQLInt,
        description: "Condition. 1:new 2:used-like new 3:used-good 3:used-fair.",
      },
      tags: {
        type: GraphQLString,
        description: "Tags of post, eg. 'PC','Computer','HP'.",
      },
      youtube: {
        type: GraphQLString,
        description: "Youtube link.",
      },
      websitelink: {
        type: GraphQLString,
        description: "Website link.",
      },
      phonenumber: {
        type: GraphQLString,
        description: "Phonenumber of the post.",
      },
      visit: {
        type: GraphQLInt,
        description: "Visit number of the post.",
      },
      createdAt: {
        type: GraphQLInt,
        description: "The creation time of the post. UTC Timestamp.",
      },
      updatedAt: {
        type: GraphQLInt,
        description: "The update time of the post. UTC Timestamp.",
      },
      user: { 
        type: UserType,
        description: "User's info of this post.",
        resolve: async (post) => {
          let res = await dbQuery(`SELECT * FROM User WHERE id = ${parseInt(post.userID)}`);
          return res[0];
        }
      },
      images: {
        type: new GraphQLList(PostImageType),
        description: "Images of this post.",
        resolve: async (post) => {
          let res = await dbQuery(`SELECT * FROM PostImage WHERE postID = ${parseInt(post.id)}`);
          return res;
        }
      }
    }
  ) 
});

module.exports = PostType;