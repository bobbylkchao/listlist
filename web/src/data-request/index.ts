import { getGraphQL, ls, userAuthLSInfos } from "../utils";

/**
 * getGetInfo()
 * @desc Get user's geo infos
 * @param {void} dispatch redux dispatch
 * @return {null}
 */
export const getGeoInfo = (callback: () => void) => {
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
    callback(result);
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
    const res = {
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
interface UserLoginReqInterface{
  email: string;
  password: string;
}
export const userLoginReq = (params: UserLoginReqInterface, callback: () => void) => {
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

export const tokenValidation = (callback: () => void) => {
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
        let validRes: boolean;
        if(result.data.validateToken.code === 200){
          validRes = true;
        }else{
          validRes = false;
          userAuthLSInfos.clear();
        }
        callback && typeof(callback) === 'function' ? callback(validRes) : null;
      }
    });
  }
};

// TODO: to be removed
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
