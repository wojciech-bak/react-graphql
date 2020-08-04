// export {};
import { gql, useLazyQuery, ApolloQueryResult } from '@apollo/client';
import { ArtistEdge, Artist } from '../types';

export type SearchResponse = {
  search: {
    artists: {
      __typename?: string;
      edges: ArtistEdge[];
      pageInfo: {
        endCursor: string;
      };
    };
  };
};

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
        }
      }
    }
  }
`;

type UseArtistsHook = {
  artists: Artist[];
  loading: boolean;
  loadArtists: () => void;
  loadMore?: () => Promise<ApolloQueryResult<SearchResponse>> | null;
};

export default function useArtists(name: string): UseArtistsHook {
  const [loadArtists, { loading, data, fetchMore }] = useLazyQuery(
    SEARCH_ARTISTS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: { name, cursor: '' },
    }
  );

  if (!data || (loading && !data.search))
    return { loading, artists: [], loadArtists };

  const loadMore = (): Promise<ApolloQueryResult<SearchResponse>> | null => {
    if (!fetchMore) return null;

    return fetchMore({
      query: SEARCH_ARTISTS_QUERY,
      variables: {
        cursor: data.search.artists.pageInfo.endCursor,
        name,
      },
      updateQuery: (prevResult, { fetchMoreResult: newResult }) => {
        const newEdges =
          newResult && newResult.search && newResult.search.artists.edges;
        const pageInfo = (newResult && newResult.search.artists.pageInfo) || {
          endCursor: '',
        };
        const { __typename } = prevResult.search.artists;

        return newEdges && newEdges.length
          ? {
              search: {
                artists: {
                  __typename,
                  edges: [...prevResult.search.artists.edges, ...newEdges],
                  pageInfo,
                },
              },
            }
          : prevResult;
      },
    });
  };

  return {
    artists:
      (data &&
        (data.search.artists.edges as ArtistEdge[]).map(({ node }) => node)) ||
      [],
    loading,
    loadArtists,
    loadMore,
  };
}
