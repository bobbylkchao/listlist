/**
 * getTimeStamp
 * @desc get the utc timestamp
 * @returns {number} timestamp
 */
const getTimeStamp = () => Math.floor(new Date().getTime()/1000);


/**
 * Email address validation
*/
const emailValidation = (value) => {
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
const usernameValidation = (value) => {
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
const passwordValidation = (value) => {
  if(!value){
    return { status: false, message: 'Please enter the password' };
  }

  if(value.length<6){
    return { status: false, message: 'The name cannot be less than 6 digits' };
  }

  return { status: true, message: '' };
};

module.exports = {
  getTimeStamp,
  emailValidation,
  usernameValidation,
  passwordValidation,
};