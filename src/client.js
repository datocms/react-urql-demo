import { createClient } from "urql";

const apiToken = process.env.REACT_APP_DATOCMS_API_TOKEN;
const url = `https://graphql.datocms.com/?apiToken=${apiToken}`;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + apiToken
};
const client = createClient({ url, fetchOptions: { headers } });
export default client;
