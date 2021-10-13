import webConfig from "../web.config";

/**
 * GraphQL request method
 */
const getGraphQL = (query: string, callback: (res: any) => void) => {
  fetch(webConfig.apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query
    })
  })
  .then(res => res.json())
  .then(res => callback(res))
  .catch(error => {
    console.error(`getGraphQL error, ${error}`);
  })
};

export {
  getGraphQL,
}