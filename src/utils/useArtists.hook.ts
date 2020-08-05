import { useLazyQuery, ApolloQueryResult } from '@apollo/client';
import { SearchResponse, UseArtistsHook } from '../types';
import queries from './queries';
import * as helpers from './helpers';

const updateQuery = (
  prevResult: SearchResponse,
  { fetchMoreResult: newResult }: { fetchMoreResult?: SearchResponse }
): SearchResponse => {
  const newEdges = helpers.extractEdges(newResult);
  const pageInfo = helpers.extractPageInfo(newResult);
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
};

export default function useArtists(name: string): UseArtistsHook {
  const { SEARCH_ARTISTS_QUERY: query } = queries;
  const [loadArtists, { loading, data, fetchMore }] = useLazyQuery(query, {
    notifyOnNetworkStatusChange: true,
    variables: { name, cursor: '' },
  });

  if (!data || (loading && !data.search) || !fetchMore) {
    return { loading, artists: [], hasNextPage: false, loadArtists };
  }

  const loadMore = (): Promise<ApolloQueryResult<SearchResponse>> =>
    fetchMore({
      query,
      variables: {
        cursor: data.search.artists.pageInfo.endCursor,
        name,
      },
      updateQuery,
    });

  return {
    artists: helpers.extractEdges(data).map(({ node }) => node),
    hasNextPage: data.search.artists.pageInfo.hasNextPage,
    loading,
    loadArtists,
    loadMore,
  };
}
