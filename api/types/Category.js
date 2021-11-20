const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const { dbQuery } = require('../database');

const CategoryItemsItemsType = new GraphQLObjectType({
  name: 'CategoryItemsItems',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  }
});

const CategoryItemsType = new GraphQLObjectType({
  name: 'CategoryItems',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    items: {
      type: new GraphQLList(CategoryItemsItemsType),
      resolve: async (category) => {
        // Get level 2 sub-items
        let subitemsTwo = await dbQuery(`SELECT * FROM category WHERE upperID = ${category.id}`);
        return subitemsTwo;
      }
    }
  }
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    items: {
      type: new GraphQLList(CategoryItemsType),
      resolve: async (category) => {
        // Get level 1 sub-items
        let subitemsOne = await dbQuery(`SELECT * FROM category WHERE upperID = ${category.id}`);
        return subitemsOne;
      }
    }
  }
});

module.exports = CategoryType;
