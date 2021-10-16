const { GraphQLString, GraphQLNonNull } = require('graphql');
const { dbQuery } = require('../../database');
const { UserType } = require('../../types');
const { getTimeStamp } = require('../../libs/utils');
const { createHash } = require('../../libs/Auth');

const insertUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, name, password }){
    let hashedPwd = await createHash(password);
    let res = await dbQuery(`insert into User (email, name, password, createdAt) values ('${email}', '${name}', '${hashedPwd}', ${getTimeStamp()})`);
    return { id: res.insertId }
  }
};

module.exports ={
  insertUser,
};