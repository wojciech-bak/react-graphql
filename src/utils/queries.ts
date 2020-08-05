import { gql } from '@apollo/client';

const SEARCH_ARTISTS_QUERY = gql`
  query SearchArtists($name: String!, $cursor: String) {
    search {
      artists(query: $name, first: 6, after: $cursor) {
        edges {
          node {
            id
            name
            country
            type
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export default { SEARCH_ARTISTS_QUERY };
