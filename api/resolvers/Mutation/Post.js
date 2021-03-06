const { GraphQLInt, GraphQLString, GraphQLFloat, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const { dbQuery } = require('../../database');
const { DefaultType, UploadImagesType } = require('../../types');
const { getTimeStamp } = require('../../libs/utils');
const { awsS3ImageUpload } = require('../../libs/awsS3ImageUpload');
const { AuthToken } = require('../../libs/Auth');

/**
 * insertPost
 * @returns {number} code, eg. 200: success, 400: failed, 500: token errors
 * @returns {string} message, processed result
 */
const insertPost = {
  type: DefaultType,
  args: {
    country: { type: new GraphQLNonNull(GraphQLString) },
    region: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    long: { type: new GraphQLNonNull(GraphQLFloat) },
    exactLocation: { type: new GraphQLNonNull(GraphQLBoolean) },
    userID: { type: new GraphQLNonNull(GraphQLInt) },
    categoryID: { type: new GraphQLNonNull(GraphQLInt) },
    adtype: { type: new GraphQLNonNull(GraphQLInt) },
    forsaleby: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    price_value: { type: GraphQLInt },
    address: { type: new GraphQLNonNull(GraphQLString) },
    fulfillment: { type: GraphQLString },
    cashless_pay: { type: GraphQLInt },
    condition: { type: GraphQLInt },
    tags: { type: GraphQLString },
    youtube: { type: GraphQLString },
    websitelink: { type: GraphQLString },
    phonenumber: { type: GraphQLString },
    uploadImages: { type: GraphQLString },
  },
  async resolve(_, {
    country,
    region,
    city,
    lat,
    long,
    exactLocation,
    userID,
    categoryID,
    adtype,
    forsaleby,
    title,
    description,
    price,
    price_value,
    address,
    fulfillment,
    cashless_pay,
    condition,
    tags,
    youtube,
    websitelink,
    phonenumber,
    uploadImages
  }){
    // token validation
    if(!global.token || global.token === null || global.token === 'null'){
      return {code: 500, message: 'Token is missing'};
    }

    if(!AuthToken.verify(global.token)){
      return {code: 500, message: 'Token Expired'};
    }

    const currentTimeStamp = getTimeStamp();

    let res = await dbQuery(
      "INSERT INTO `post` (`country`,`region`,`city`,`lat`,`long`,`exactLocation`, `userID`, `categoryID`, `adtype`, `forsaleby`, `title`, `description`, `price`, `price_value`, `address`, `fulfillment`, `cashless_pay`, `condition`, `tags`, `youtube`, `websitelink`, `phonenumber`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        country,
        region,
        city,
        lat,
        long,
        exactLocation,
        parseInt(userID),
        parseInt(categoryID),
        parseInt(adtype),
        parseInt(forsaleby),
        title,
        description,
        parseInt(price),
        price_value,
        address,
        fulfillment === "null" ? null : fulfillment,
        cashless_pay === "null" ? null : cashless_pay,
        condition === "null" ? null : condition,
        tags === "null" ? null : tags,
        youtube === "null" ? null : youtube,
        websitelink === "null" ? null : websitelink,
        phonenumber === "null" ? null : phonenumber,
        currentTimeStamp,
        currentTimeStamp
      ]
    );

    if(!res.insertId){
      return {code: 400, message: err.code};
    }

    /**
     * handle image upload
     */
    uploadImages = JSON.parse(uploadImages);
    if(uploadImages && uploadImages.length > 0){
      uploadImages.map(async(item) => {
        let orgImageUploadRes = await awsS3ImageUpload(res.insertId, 'posts', '640',item.img);
        let thumbnailImageUploadRes = await awsS3ImageUpload(res.insertId, 'posts', '200',item.thumbnail);
        await dbQuery(
          "INSERT INTO `postimage` (`postID`, `url`, `thumbnailUrl`, `main`) VALUES (?, ?, ?, ?);",
          [
            parseInt(res.insertId),
            orgImageUploadRes.key,
            thumbnailImageUploadRes.key,
            item.main
          ]
        );
      });
    }

    return {code: 200, message: res.insertId};
  }
};

module.exports = {
  insertPost
};