const { GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLFloat } = require('graphql');
const { dbQuery } = require('../../database');
const { PostType } = require('../../types');

const queryPosts = {
  type: new GraphQLList(PostType),
  description: "Get post list.",
  args: {
    country: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Country of posts, eg: CA"
    },
    region: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Region of posts, eg: MB"
    },
    city: {
      type: GraphQLString,
      description: "(Optional) City of posts, eg: WINNIPEG"
    },
    lat: {
      type: GraphQLFloat,
      description: "Publisher's latitude",
    },
    long: {
      type: GraphQLFloat,
      description: "Publisher's longitude",
    },
    categoryID: {
      type: GraphQLInt,
      description: "(Optional) The id of the category that needs to get the data."
    },
    topID: {
      type: GraphQLInt,
      description: "(Optional) From which ID to get the data, used to get latest data"
    },
    bottomID: {
      type: GraphQLInt,
      description: "(Optional) From which ID to get the data, used to get previous data"
    },
  },
  async resolve(_, { country, region, city, categoryID, topID, bottomID }){
    //let categoryIDFilter = categoryID ? `WHERE categoryID = ${categoryID}` : '';
    //let fromIDFilter = lastID ? `AND  id < ${lastID}` : '';
    //let res = await dbQuery(`SELECT * FROM Post ${categoryIDFilter} ${fromIDFilter} ORDER BY id desc, updatedAt desc limit 10`);
    const dataCountPerTime = 10;
    let res = "";
    let sql = "";
    let sql_part_main = "SELECT * FROM post WHERE country = ? AND region = ?";
    let sql_part_orderby = "ORDER BY id desc, updatedAt desc";
    let sql_limit = `LIMIT ${dataCountPerTime}`;
    let params = [country, region];

    if(city){
      // SELECT * FROM Post WHERE country = ? AND region = ? AND city = ? ORDER BY id desc, updatedAt desc limit 10
      sql_part_main = `${sql_part_main} AND city = ?`;
      params = [...params, city];
    }

    if(categoryID){
      // SELECT * FROM Post WHERE country = ? AND region = ? AND categoryID = ? ORDER BY id desc, updatedAt desc limit 10
      sql_part_main = `${sql_part_main} AND categoryID = ?`;
      params = [...params, categoryID];
    }

    if(topID){
      // SELECT * FROM Post WHERE country = ? AND region = ? AND id > ? ORDER BY id desc, updatedAt desc
      sql_limit = "";
      sql_part_main = `${sql_part_main} AND id > ?`;
      params = [...params, topID];
    }

    if(bottomID){
      // SELECT * FROM Post WHERE country = ? AND region = ? AND id < ? ORDER BY id desc, updatedAt desc limit 10
      sql_part_main = `${sql_part_main} AND id < ?`;
      params = [...params, bottomID];
    }

    sql = `${sql_part_main} ${sql_part_orderby} ${sql_limit}`;

    res = await dbQuery(sql, params);
    
    return res;
  }
};

module.exports = queryPosts;
