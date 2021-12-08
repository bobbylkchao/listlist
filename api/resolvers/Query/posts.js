const { GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLFloat } = require('graphql');
const { dbQuery } = require('../../database');
const { PostType } = require('../../types');

const queryPosts = {
  type: new GraphQLList(PostType),
  description: "Get post list.",
  args: {
    region: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Region of posts, eg: MB"
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
      description: "City of posts, eg: Winnipeg"
    },
    lat: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Publisher's latitude",
    },
    long: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Publisher's longitude",
    },
    radius: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Range of search area, unit is km",
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
  async resolve(_, { region, city, lat, long, radius, categoryID, topID, bottomID }){
    const dataCountPerTime = 50;// how many data will return, default is 50;
    let res = "";
    let sql = "";
    let sql_part_main = `
      SELECT
        *,
        (6371 * acos (cos(radians(?)) * cos(radians(lat)) * cos(radians(\`long\`)-radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance 
      FROM
        post
      WHERE
        lat <> 0.000000000000000
      AND
        \`long\` <> 0.000000000000000
      AND
        city = ?
      AND
        region = ?
    `;
    let sql_limit = ` LIMIT ${dataCountPerTime}`;
    let params = [lat, long, lat, city, region];
 
    // TODO: category tree search, for some cases, user wanna search posts in first level or second level categories
    if(categoryID || categoryID !== 0){
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

    sql = `${sql_part_main} HAVING distance <= ? ORDER BY id desc, updatedAt desc ${sql_limit}`;
    params = [...params, radius];

    res = await dbQuery(sql, params);
    
    return res;
  }
};

module.exports = queryPosts;
