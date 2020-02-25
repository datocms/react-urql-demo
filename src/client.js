import { createClient } from "urql";

const apiToken = process.env.REACT_APP_DATO_API_TOKEN;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + apiToken
};
const client = createClient({
  url: "https://graphql.datocms.com",
  fetchOptions: { headers }
});
export default client;
