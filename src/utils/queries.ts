import { gql } from '@apollo/client';

const SEARCH_ARTISTS_QUERY = gql`
  query SearchArtists($name: String!, $cursor: String) {
    search {
      artists(query: $name, first: 6, after: $cursor) {
        edges {
          node {
            id
            mbid
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

const ARTIST_DETAILS_QUERY = gql`
  query LookupArtist($mbid: MBID!) {
    lookup {
      artist(mbid: $mbid) {
        id
        mbid
        name
        country
        area {
          id
          name
        }
        releaseGroups(first: 20, type: ALBUM) {
          totalCount
          nodes {
            id
            title
            disambiguation
            firstReleaseDate
            releases(status: OFFICIAL, first: 1) {
              nodes {
                recordings {
                  nodes {
                    title
                    length
                    spotify {
                      uri
                    }
                  }
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default { SEARCH_ARTISTS_QUERY, ARTIST_DETAILS_QUERY };
