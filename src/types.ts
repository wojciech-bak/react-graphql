import { ApolloQueryResult } from '@apollo/client';

export type Artist = {
  name: string;
  id: string;
  country: string;
  type: string;
};

export type ArtistsListProps = {
  artists: Artist[];
};

export type ArtistEdge = {
  node: Artist;
  cursor: string;
};

export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

export type SearchResponse = {
  search: {
    artists: {
      __typename?: string;
      edges: ArtistEdge[];
      pageInfo: PageInfo;
    };
  };
};

export type UseArtistsHook = {
  artists: Artist[];
  loading: boolean;
  loadArtists: () => void;
  hasNextPage: boolean;
  loadMore?: () => Promise<ApolloQueryResult<SearchResponse>> | null;
};
