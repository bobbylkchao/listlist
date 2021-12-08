import {
  getGraphQL,
  ls,
  userAuthLSInfos,
  debugLog,
  getGraphQLWithVariables
} from "../utils";

/**
 * getGetInfo()
 * @desc Get user's geo infos
 * @param {void} dispatch redux dispatch
 * @return {null}
 */
export const getGeoInfo = (lat: number, long: number, callback?: (result: any) => void) => {
  const query = `
    query(
      $lat: Float!,
      $long: Float!
    ){
      geo(
        lat: $lat,
        long: $long
      ){
        country,
        region,
        city,
        streetNumber,
        street,
        zipcode,
        lat,
        long,
        remark
      }
    }
  `;

  const variables = {
    lat: lat,
    long: long,
  };

  getGraphQLWithVariables(query, variables, (res: any) => {
    callback ? callback(res) : null;
  });
};

/**
 * userRegisterReq()
 * @desc user register
 * @param {string} email user's email
 * @param {string} name user's name
 * @param {string} password user's password
 */
interface UserRegReqInterface{
  email: string;
  name: string;
  password: string;
}
export const userRegisterReq = (params: UserRegReqInterface, callback: (res: any) => void) => {
  getGraphQL(`
    mutation {
      addUser(
        email: "${params.email}",
        name: "${params.name}",
        password: "${params.password}"
      ) {
        code,
        message,
        token
      }
    }
  `, (result: any) => {
    const res: any = {
      code: 200,
      message: null,
      token: "",
    };

    if(result.errors){
      // has graphQL errors
      res.code = 500;
      if(result.errors[0].message.indexOf("ER_DUP_ENTRY") !== -1){
        res.message = "Email address has been registered";
      }else{
        res.message = "Registration failed";
      }
    }else{
      if(result.data.addUser.code === 200){
        res.message = result.data.addUser.message;
        res.token = result.data.addUser.token;
      }else{
        // has validation errors
        res.code = 500;
        res.message = result.data.addUser.message;
      }
    }

    callback(res);
  });
};

/**
 * userLoginReq()
 * @desc user login
 * @param {string} email user's email
 * @param {string} password user's password
 */
interface UserLoginReqInterface{
  email: string;
  password?: string;
  channel: string;
  channelName?: string;
  channelHeadNav?: string;
  channelID?: string;
}
export const userLoginReq = (params: UserLoginReqInterface, callback: (result:any) => void) => {
  getGraphQL(`
    query{
      auth(
        email: "${params.email}",
        password: "${params.password}",
        channel: "${params.channel}",
        channelName: "${params.channelName}",
        channelHeadNav: "${params.channelHeadNav}",
        channelID: "${params.channelID}",
      ){
        code,
        message,
        token
      }
    }
  `, (result: any) => {
    callback(result);
  });
};

/**
 * tokenValidation
 * @desc Check the validity of the user's token 
 * @param {void} reduxDispatch pass `useDispatch()` from react-redux as a param
 */
export const tokenValidation = (reduxDispatch: (params: any) => void) => {
  // Get user auth infomations from localstorage
  const userAuthInfos = userAuthLSInfos.get();

  // User auth informations must with full fields
  if(
    userAuthInfos.token &&
    userAuthInfos.name &&
    userAuthInfos.email &&
    userAuthInfos.userID &&
    userAuthInfos.createdAt &&
    userAuthInfos.headnav
  ){
    // Validate token, by using `Authorization` header in request
    getGraphQL(`
      query{
        validateToken{
          code,
          message
        }
      }
    `, (result:any) => {

      if(result.data){
        if(result.data.validateToken.code === 200){
          // token is valid, update reducer state
          reduxDispatch({
            type: "setUserAuthState",
            value:{
              executed: true,
              auth: true,
              token: userAuthInfos.token,
              name: userAuthInfos.name,
              email: userAuthInfos.email,
              userID: userAuthInfos.userID,
              createdAt: userAuthInfos.createdAt,
              headnav: userAuthInfos.headnav,
            },
          });
        }else{
          // token is not valid, clear user auth informations in localstorage
          reduxDispatch({ type: 'setUserAuthExecuted' });
          userAuthLSInfos.clear();
        }
      }
    });
  }else{
    // Token not found, set userAuth `executed` state from `false` to `true`
    reduxDispatch({ type: 'setUserAuthExecuted' });
  }
};

export const getAllCategories = (callback: (params: any) => void) => (
  getGraphQL(`
    query{
      category{
        id,
        name,
        icon,
        items{
          id,
          name,
          items{
            id,
            name
          }
        }
      }
    }
  `, (r:any) => {
    callback(r);
  })
);

/**
 * add post request
 */
interface SubmitAddPostParamsInterface{
  country: string,
  region: string,
  city: string,
  userID: null | number,
  categoryID: null | number,
  adtype: number,
  forsaleby:number,
  title: null | string | undefined,
  description: null | string | undefined,
  price: number,
  price_value: null | number,
  address: null | string,
  lat: null | number,
  long: null | number,
  exactLocation: boolean,
  fulfillment: [] | string[],
  cashless_pay: null | number,
  condition: null | number,
  tags: [] | string[],
  youtube: null | string,
  websitelink: null | string,
  phonenumber: null | string,
  uploadImages: [] | [{
    img: string,
    thumbnail: string,
    main: boolean,
  }],
}
export const submitAddPost = (params: SubmitAddPostParamsInterface, callback: (res: any) => void) => {
  const graphQLAddPostQuery = `
    mutation(
      $country: String!,
      $region: String!,
      $city: String!,
      $userID: Int!,
      $categoryID: Int!,
      $adtype: Int!,
      $forsaleby: Int!,
      $title: String!,
      $description: String!,
      $price: Int!,
      $price_value: Int,
      $address: String!,
      $lat: Float!,
      $long: Float!,
      $exactLocation: Boolean!,
      $fulfillment: String,
      $cashless_pay: Int,
      $condition: Int,
      $tags: String,
      $youtube: String,
      $websitelink: String,
      $phonenumber: String,
      $uploadImages: String
    ){
      addPost(
        country: $country,
        region: $region,
        city: $city,
        userID: $userID,
        categoryID: $categoryID,
        adtype: $adtype,
        forsaleby: $forsaleby,
        title: $title,
        description: $description,
        price: $price,
        price_value: $price_value,
        address: $address,
        lat: $lat,
        long: $long,
        exactLocation: $exactLocation,
        fulfillment: $fulfillment,
        cashless_pay: $cashless_pay,
        condition: $condition,
        tags: $tags,
        youtube: $youtube,
        websitelink: $websitelink,
        phonenumber: $phonenumber,
        uploadImages: $uploadImages
      ){
        code,
        message
      }
    }
  `;

  const graphQLAddPostVariables = {
    country: params.country.trim(),
    region: params.region.trim(),
    city: params.city.trim(),
    userID: params.userID,
    categoryID: params.categoryID,
    adtype: params.adtype,
    forsaleby: params.forsaleby,
    title: params.title?.trim(),
    description: params.description?.trim(),
    price: params.price,
    price_value: params.price_value,
    address: params.address?.trim(),
    lat: params.lat,
    long: params.long,
    exactLocation: params.exactLocation,
    fulfillment: JSON.stringify(params.fulfillment),
    cashless_pay: params.cashless_pay,
    condition: params.condition,
    tags: JSON.stringify(params.tags),
    youtube: params.youtube,
    websitelink: params.websitelink,
    phonenumber: params.phonenumber,
    uploadImages: JSON.stringify(params.uploadImages)
  };

  getGraphQLWithVariables(graphQLAddPostQuery, graphQLAddPostVariables, (res: any) => {
    callback(res);
  });
};

/**
 * Get Post List
 * @param {string} region The region where the post is located
 * @param {string} city The city where the post is located
 * @param {number} lat Search range, lat
 * @param {number} long Search range, long
 * @param {number} radius Search range, radius, unit is KM
 * @param {number} categoryID (Optional) Post category id
 * @param {number} topID (Optional) From which id to get the latest data 
 * @param {number} bottomID (Optional) From which id to get more data 
 * 
 */
export const getPostList = (params: {
  region: string,
  city: string,
  lat: number,
  long: number,
  radius: number,
  categoryID?: number,
  topID?: number,
  bottomID?: number,
}, callback?: (res: any) => void) => {
  const query = `
    query(
      $region: String!,
      $city: String!,
      $lat: Float!,
      $long: Float!,
      $radius: Int!,
      $categoryID: Int,
      $topID: Int,
      $bottomID: Int
    ){
      posts(
        region: $region,
        city: $city,
        lat: $lat,
        long: $long,
        radius: $radius,
        categoryID: $categoryID,
        topID: $topID,
        bottomID: $bottomID
      ){
        id,
        city,
        distance,
        lat,
        long,
        address,
        exactLocation,
        categoryID,
        adtype,
        forsaleby,
        title,
        description,
        price,
        price_value,
        fulfillment,
        cashless_pay,
        condition,
        tags,
        youtube,
        websitelink,
        phonenumber,
        visit,
        createdAt,
        updatedAt,
        user{
          id,
          name,
          headnav,
        },
        images{
          id,
          url,
          thumbnailUrl,
          main,
        }
      }
    }
  `;

  const variables = {
    region: params.region,
    city: params.city,
    lat: params.lat,
    long: params.long,
    radius: params.radius,
    categoryID: params.categoryID,
    topID: params.topID,
    bottomID: params.bottomID,
  };

  getGraphQLWithVariables(query, variables, (res: any) => {
    callback ? callback(res) : null;
  });
};
