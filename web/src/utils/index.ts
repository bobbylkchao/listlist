import webConfig from "../web.config";

/**
 * GraphQL request method
 */
export const getGraphQL = (query: string, callback: (res: any) => void) => {
  fetch(webConfig.apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ls.get('token'),
    },
    body: JSON.stringify({
      query: query,
    }),
  })
  .then(res => res.json())
  .then(res => callback(res))
  .catch((error:any) => {
    // console.error(`getGraphQL error, ${error}`);
  });
};

/**
 * Email address validation
*/
export const emailValidation = (value: string) => {
  if(!value){
    return { status: false, message: 'Please enter the email' };
  }

  if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))){
    return { status: true, message: '' };
  }

  return { status: false, message: 'Please enter a valid email address' };
};

/**
 * User Name validation
 */
export const usernameValidation = (value: string) => {
  if(!value){
    return { status: false, message: 'Please enter the name' };
  }

  if(value.length<=3){
    return { status: false, message: 'The name cannot be less than 3 digits' };
  }

  if(!/^[a-zA-ZÀ-ÿ. ]*$/.test(value)){
    return { status: false, message: 'The name only allows letters, dot and space' };
  }

  return { status: true, message: '' };
};

/**
 * Password validation
 */
export const passwordValidation = (value: string) => {
  if(!value){
    return { status: false, message: 'Please enter the password' };
  }

  if(value.length<6){
    return { status: false, message: 'The name cannot be less than 6 digits' };
  }

  return { status: true, message: '' };
};

/**
 * Password repeat validation
 */
export const passwordRepeatValidation = (orgPassword: string, repeatPassword: string) => {
  if(!orgPassword){
    return { status: false, message: 'Please enter the password' };
  }

  if(!repeatPassword){
    return { status: false, message: 'Please re-enter the password' };
  }

  if(orgPassword !== repeatPassword){
    return { status: false, message: 'Passwords do not match' };
  }

  return { status: true, message: '' };
};

/**
 * LocalStorage
 */
export const ls = {
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    const keyValue = localStorage.getItem(key);
    try{
      return keyValue ? JSON.parse(keyValue) : null;
    }catch(err){
      return null;
    }
  },
  delete: (key: string) => {
    localStorage.removeItem(key);
  },
};

/**
 * User Auth LocalStorage Infos
 * @method userAuthLSInfos.set() Set all the user's auth infos to localstorage
 * @method userAuthLSInfos.get(); Get all the user's auth infos from localstorage
 * @method userAuthLSInfos.clear(); Clear the user's auth infos from localstorage
 */
export const userAuthLSInfos = {
  set: (
    params: {
      executed: boolean,
      auth: boolean,
      token: string | null,
      name: string | null,
      email: string | null,
      userID: number | null,
      headnav?: string | undefined,
      createdAt: number | null,
      reduxDispatch?: (params: any) => void,
    },
  ) => {

    ls.set('token', params.token);
    ls.set('name', params.name);
    ls.set('email', params.email);
    ls.set('userID', params.userID);
    ls.set('headnav', params.headnav ? params.headnav : 'default');
    ls.set('createdAt', params.createdAt);

    if(params.reduxDispatch && typeof(params.reduxDispatch) === 'function'){
      params.reduxDispatch({
        type: "setUserAuthState",
        value: {
          executed: params.executed,
          auth: params.auth,
          token: params.token,
          name: params.name,
          email: params.email,
          userID: params.userID,
          headnav: params.headnav ? params.headnav : 'default',
          createdAt: params.createdAt,
        },
      });
    }

  },
  get: () => {
    return {
      token: ls.get('token') ?? null,
      name: ls.get('name') ?? null,
      email: ls.get('email') ?? null,
      userID: ls.get('userID') ?? null,
      headnav: ls.get('headnav') ?? 'default',
      createdAt: ls.get('createdAt') ?? null,
    };
  },
  clear: () => {
    userAuthLSInfos.set({
      executed: true,
      auth: false,
      token: null,
      name: null,
      email: null,
      userID: null,
      headnav: 'default',
      createdAt: null,
    });
  },
};

/**
 * echo debug log
 * @desc will execute according `debug` value in webConfig file.
 */

export const debugLog = (msg: string | number) => {
  webConfig.debug ? console.log(`${getCurrentTime()} - [DEBUG] - ${msg}`) : null;
};

const getCurrentTime = () => {
  const zeroFill = (i: number) => {
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
  };

  const date = new Date();
  const month = zeroFill(date.getMonth() + 1);
  const day = zeroFill(date.getDate());
  const hour = zeroFill(date.getHours());
  const minute = zeroFill(date.getMinutes());
  const second = zeroFill(date.getSeconds());
  const ms = zeroFill(date.getMilliseconds());
  
  return date.getFullYear() + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second + ":" + ms;
}