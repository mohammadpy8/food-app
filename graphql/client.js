import { gql } from "@apollo/client";

const CLIENT = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

export { CLIENT, GET_DOG_PHOTO };
