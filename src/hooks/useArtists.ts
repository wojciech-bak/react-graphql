import { useLazyQuery, ApolloQueryResult } from '@apollo/client';
import { SearchResponse, Artist } from '../types';
import queries from '../utils/queries';
import {
  updateSearchQuery as updateQuery,
  extractEdges,
} from '../utils/helpers';

type UseArtistsHook = {
  artists: Artist[];
  loading: boolean;
  loadArtists: () => void;
  hasNextPage: boolean;
  loadMore?: () => Promise<ApolloQueryResult<SearchResponse>> | null;
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
    artists: extractEdges(data).map(({ node }) => node),
    hasNextPage: data.search.artists.pageInfo.hasNextPage,
    loading,
    loadArtists,
    loadMore,
  };
}
