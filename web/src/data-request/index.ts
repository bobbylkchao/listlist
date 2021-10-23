import { getGraphQL } from "../utils";

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
export const userRegisterReq = (params: userRegReqInterface, callback: (res: { id: any, error: any }) => void) => {
  getGraphQL(`
    mutation {
      addUser(
        email: "${params.email}",
        name: "${params.name}",
        password: "${params.password}"
      ) {
        id,
        error
      }
    }  
  `, (result: any) => {
    let res = {
      id: null,
      error: "",
    };

    if(result.errors){
      if(result.errors[0].message.indexOf("ER_DUP_ENTRY" !== -1)){
        res.error = "Email address has been registered";
      }else{
        res.error = "Registration failed";
      }
    }else{
      if(result.data.addUser.error){
        res.error = result.data.addUser.error;
      }else{
        res.id = result.data.addUser.id;
      }
    }
    
    callback(res);
  });
};