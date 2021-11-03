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

/**
 * getCurrentTime
 * @desc Get current time, with milliseconds.
 */
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

/**
 * getQueryVariable
 * @desc Get query variable from URL
 * @param {string} variable
 * @returns {string} Already used decodeURIComponent()
 */
export const getQueryVariable = (variable) => {
  if(!variable) return "";
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i=0;i<vars.length;i++) {
    const pair = vars[i].split("=");
    if(pair[0] == variable) return decodeURIComponent(pair[1]);
  }
  return "";
}

/**
 * getImageBase64
 * @desc Convert image file to base64 string
 * @param {object} file
 */
export const getImageBase64 = (file: any) => {
  return new Promise((resolve: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result ?? '');
    };
  });
}

/**
 * priceNumberCheck
 * @desc Check the input value is a valid price number or not
 * @param {number | string} value
 * @returns {number}
 */
export const priceNumberCheck = (value: number | string | null | undefined) => {
  return value.replace(/[^0-9\.]/g,'');
};

/**
 * phonNumberTransform
 * @desc Transform phone number to canadian number format
 * @param {string | number | null | undefined} value
 * @returns {string}
 */
export const phonNumberTransform = (value: string | number | null | undefined) => {
  // remove all non-numeric first
  let valueWithoutDash = value.replace(/\D/g,"");
  // add `-` behind the number
  let newNumber = valueWithoutDash;
  if(valueWithoutDash.length >= 3){
    newNumber = valueWithoutDash.substring(0, 3) + '-' + valueWithoutDash.substring(3, valueWithoutDash.length);
  }
  if(valueWithoutDash.length >= 6){
    newNumber = newNumber.substring(0, 7) + '-' + valueWithoutDash.substring(6, valueWithoutDash.length);
  }
  return newNumber;
};

/**
 * regexLetterNumberSpace
 * @desc Regex, only keep letter, number, and space
 * @param {string | number} value 
 * @returns {string | number} new value
 */
export const regexLetterNumberSpace = (value: string | number) => {
  return value.trim().replace(/[^a-z0-9À-ÿ ]/gi, '');
};
