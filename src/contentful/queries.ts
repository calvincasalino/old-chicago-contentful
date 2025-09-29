import { gql } from "graphql-request";

export const GET_PLACES = gql`
  query GetPlaces($limit: Int = 200) {
    placeCollection(limit: $limit, order: title_ASC) {
      items {
        sys { id }
        title
        subject
        description
        creator
        publisher
        date
        mediaType
        formatType
        identifier
        source
        language
        coverage
        rights
        collection
        slug
        primaryMedia {
          sys { id }
          title
          description
          url(transform: { width: 1600 })
        }
        latitudeLongitude {
          lat
          lon
        }
      }
    }
  }
`;

export const GET_PLACE_BY_SLUG = gql`
  query GetPlaceBySlug($slug: String!) {
    placeCollection(where: { slug: $slug }, limit: 1) {
      items {
        sys { id }
        title
        subject
        description
        creator
        publisher
        date
        mediaType
        formatType
        identifier
        source
        language
        coverage
        rights
        collection
        slug
        primaryMedia {
          sys { id }
          title
          description
          url(transform: { width: 1600 })
        }
        latitudeLongitude {
          lat
          lon
        }
      }
    }
  }
`;
