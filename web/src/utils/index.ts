import imageCompression from 'browser-image-compression';
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
 * GraphQL request method, with variables
 */
 export const getGraphQLWithVariables = (query: string, variables: {}, callback: (res: any) => void) => {
  fetch(webConfig.apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ls.get('token'),
    },
    body: JSON.stringify({
      query: query,
      variables: variables
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
  clear: (dispatch?: (params:any) => void) => {
    userAuthLSInfos.set({
      executed: true,
      auth: false,
      token: null,
      name: null,
      email: null,
      userID: null,
      headnav: 'default',
      createdAt: null,
      reduxDispatch: dispatch ? dispatch : () => {},
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
export const getQueryVariable = (variable: any) => {
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
 * URL format validation
 * @param {string} value 
 * @returns {boolean}
 */
export const urlValidation = (value: string) => {
  if(!value) return false;
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  return value.match(new RegExp(expression)) ? true : false;
};

/**
 * priceNumberCheck
 * @desc Check the input value is a valid price number or not (without dot)
 * @param {number | string} value
 * @returns {number | ""} res
 */
export const priceNumberCheck = (value: number) => {
  if(!isNaN(value)){
    return parseInt(value.toString().replace(/[^0-9]/g,''));
  }else{
    return "";
  }
};

/**
 * phonNumberTransform
 * @desc Transform phone number to canadian number format
 * @param {string | number | null | undefined} value
 * @returns {string}
 */
export const phonNumberTransform = (value: string | number) => {
  if(!value) return "";
  // remove all non-numeric first
  let valueWithoutDash = value.toString().replace(/\D/g,"");
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
  return value.toString().replace(/[^a-z0-9À-ÿ ]/gi, '');
};

/**
 * scroll to top
 * @param {number} top optional, top postion
 * @param {number} left optional, left postion
 */
export const scrollToTop = (top?: number, left?: number) => {
  window.scrollTo({
    top: top ?? 0,
    left: left ?? 0,
    behavior: 'smooth'
  });
};

/**
 * scroll to specified element
 * @param {string} elementID
 */
export const scrollToEle = (elementID: string) => {
  document.getElementById(elementID)?.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
};

/**
 * compression image
 * @param {object} file eg. e.files[0]
 * @returns {object} compressedFile
 */
export const compressionImage = (file: any) => {
  return new Promise((resolve: any) => {
    (async () => {
      // console.log(`originalFile size ${file.size / 1024} KB`);
      const options = {
        maxSizeMB: webConfig.photoCompressionMaxMB,
        maxWidthOrHeight: webConfig.photoCompressionMaxWidthOrHeight,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      // console.log(`compressedFile size ${compressedFile.size / 1024} KB`);
      resolve(compressedFile);
    })();
  });
};

/**
 * create thumbnail image
 * @param {object} file eg. e.files[0]
 * @returns {object} thumbnail image
 */
 export const thumbnailImage = (file: any) => {
  return new Promise((resolve: any) => {
    (async () => {
      const options = {
        maxSizeMB: webConfig.photoThumbnailCompressionMaxMB,
        maxWidthOrHeight: webConfig.photoThumbnailCompressionMaxWidthOrHeight,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      console.log(`thumbnail file size ${compressedFile.size / 1024} KB`);
      resolve(compressedFile);
    })();
  });
};

/**
 * based on a category, get its category tree
 * @param {number} categoryID
 * @param {object} categoryList
 * @returns {object} {one: { id: null | number, name: null | string }, two: { id: null | number, name: null | string }, three: { id: null | number, name: null | string } }
 */
export const getCategoryTree = (categoryID: number, categoryList: any) => {
  let res = {
    one: { id: null, name: null },
    two: { id: null, name: null },
    three: { id: null, name: null },
  };

  categoryList.map((levelOneItem: any, levelOneKey: number) => {

    // if found in level one
    if(parseInt(levelOneItem.id) === categoryID){
      res.one.id = levelOneItem.id;
      res.one.name = levelOneItem.name;
    }else{
      levelOneItem.items.map((levelTwoItem: any, levelTwoKey: number) => {
        // if found in level two
        if(parseInt(levelTwoItem.id) === categoryID){
          res.one.id = levelOneItem.id;
          res.one.name = levelOneItem.name;
          res.two.id = levelTwoItem.id;
          res.two.name = levelTwoItem.name;
        }else{
          levelTwoItem.items.map((levelThreeItem: any, levelThreeKey: number) => {
            if(parseInt(levelThreeItem.id) === categoryID){
              // if found in level three
              res.one.id = levelOneItem.id;
              res.one.name = levelOneItem.name;
              res.two.id = levelTwoItem.id;
              res.two.name = levelTwoItem.name;
              res.three.id = levelThreeItem.id;
              res.three.name = levelThreeItem.name;
            }
          });
        }
      });
    }
  });

  return res;
};
