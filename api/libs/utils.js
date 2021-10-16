/**
 * getTimeStamp
 * @desc get the utc timestamp
 * @returns {number} timestamp
 */
const getTimeStamp = () => Math.floor(new Date().getTime()/1000);

module.exports = {
  getTimeStamp,
};