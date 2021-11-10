const { GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');
const { dbQuery } = require('../../database');
const { DefaultType, UploadImagesType } = require('../../types');
const { getTimeStamp } = require('../../libs/utils');

const insertPost = {
  type: DefaultType,
  args: {
    userID: { type: new GraphQLNonNull(GraphQLInt) },
    categoryID: { type: new GraphQLNonNull(GraphQLInt) },
    adtype: { type: new GraphQLNonNull(GraphQLInt) },
    forsaleby: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    price_value: { type: GraphQLInt },
    address: { type: GraphQLString },
    fulfillment: { type: GraphQLString },
    cashless_pay: { type: GraphQLInt },
    condition: { type: GraphQLInt },
    tags: { type: GraphQLString },
    youtube: { type: GraphQLString },
    websitelink: { type: GraphQLString },
    phonenumber: { type: GraphQLInt },
    uploadImages: { type: new GraphQLList(UploadImagesType) },
  },
  async resolve(_, {
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
    /**
     * INSERT INTO `post`(`userID`, `categoryID`, `adtype`, `forsaleby`, `title`, `description`, `price`, `price_value`, `address`, `fulfillment`, `cashless_pay`, `condition`, `tags`, `youtube`, `websitelink`, `phonenumber`, `thumbnailURL`, `visit`, `status`, `createdAt`, `updatedAt`) VALUES (2, 3, 1, 1, 'Apple iMac 27\" Intel i7 3.5GHz, 32GB Ram, Office 2019, Dual SSDs', 'Model A1419 (EMC 2639)\\nhttps://everymac.com/systems/apple/imac/specs/\\nimac-core-i7-3.5-27-inch-aluminum-late-2013-specs.html\\n3.5 GHz Intel Quad Core, Late 2013\\n3.9GHz with Turbo Boost\\nIOS Catalina\\n27 Inch, 2560x1440\\n32GB Ram\\nDual HDDs, 256GB SSD & 500GB SSD\\nNVIDIA GeForce GTX 775M graphics processor with 2 GB of dedicated GDDR5 memory\\nBuilt-in \"FaceTime HD\" video camera and built-in stereo speakers\\nGigabit Ethernet,\\nBluetooth 4.0\\n4x USB 3.0\\n2x Thunderbolt port\\nMicrosoft Office Pro 2019\\nPrice is Firm, sorry but I will not reply to lower offers.\\nNo Trades\\nThe iMac will be set up and running at time of purchase plus you will be given 7 days to verify that everything is properly functioning.\\nThis ad will be deleted immediately after computer is sold', 1, 850, 'Winnipeg, MB R3T 4B4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 1634002037, NULL);
     */
    //let res = await dbQuery(`INSERT INTO visit (userID, postID, categoryID, createdAt) VALUES (${userID}, ${postID}, ${categoryID}, ${getTimeStamp()});`);
    //return res && res.insertId ? {code: 200, message: 'success'} : {code: 500, message: res.message};
    return {code: 200, message: 'success'};
  }
};

module.exports = {
  insertPost
};