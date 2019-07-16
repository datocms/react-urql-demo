import { createClient } from "urql";

const apiToken = process.env.REACT_APP_DATOCMS_API_TOKEN;
const endpoint = `https://graphql.datocms.com/?apiToken=${apiToken}`;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + apiToken
};
const client = new GraphQLClient(endpoint, { headers });
export default client;
