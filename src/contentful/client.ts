import { GraphQLClient } from "graphql-request";

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string;
const env = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string;
const token = import.meta.env.VITE_CONTENTFUL_CDA_TOKEN as string;

if (!space || !env || !token) {
  throw new Error("Missing Contentful env vars. Check .env.local");
}

export const contentful = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${env}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);