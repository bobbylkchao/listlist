import webConfig from "../web.config";
/**
 * GraphQL request method
 */
export const getGraphQL = (query: string, callback: (res: any) => void) => {
  fetch(webConfig.apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  })
  .then(res => res.json())
  .then(res => callback(res))
  .catch((error:any) => {
    console.error(`getGraphQL error, ${error}`);
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
