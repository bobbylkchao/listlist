import { getGraphQL, ls } from "../utils";

/**
 * getGetInfo()
 * @desc Get user's geo infos
 * @param {void} dispatch redux dispatch
 * @return {null}
 */
export const getGeoInfo = (dispatch: (params:any) => void) => {
  getGraphQL(`
    query{
      geo{
        country,
        region,
        city,
        ll
      }
    }
  `, (result: any) => {
    if(!result.data || !result.data.geo){
      dispatch({
        type: 'updateUserGeo',
        value: {
          country: "CA",
          region: "MB",
          city: "Winnipeg",
          ll: ['49.8179', '-97.1535'],
          remarks: "Error, use default values.",
        },
      });
      return;
    }
    dispatch({
      type: 'updateUserGeo',
      value: {
        country: result.data.geo.country,
        region: result.data.geo.region,
        city: result.data.geo.city,
        ll: result.data.geo.ll,
        remarks: "No error.",
      },
    });
  });
};

/**
 * userRegisterReq()
 * @desc user register
 * @param {string} email user's email
 * @param {string} name user's name
 * @param {string} password user's password
 */
interface userRegReqInterface{
  email: string;
  name: string;
  password: string
}
export const userRegisterReq = (params: userRegReqInterface, callback: (res: any) => void) => {
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
    let res = {
      code: 200,
      message: null,
      token: "",
    };

    if(result.errors){
      // has graphQL errors
      res.code = 500;
      if(result.errors[0].message.indexOf("ER_DUP_ENTRY" !== -1)){
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
 interface userLoginReqInterface{
  email: string;
  password: string
}
export const userLoginReq = (params: userLoginReqInterface, callback: () => void) => {
  getGraphQL(`
    query{
      auth(
        email: "${params.email}",
        password: "${params.password}"
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

export const tokenValidation = () => {
  const currentToken = ls.get('token');
  if(currentToken){
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
          // token is ok, update login redux state to true
        }
      }
    });
  }
};

export const testToken = () => {
  getGraphQL(`
    query{
      test{
        code,
        message
      }
    }
  `, (result: any) => {
    console.log(result);
  });
};