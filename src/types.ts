import { ApolloQueryResult } from '@apollo/client';

export type FavouritesCollection = {
  [index: string]: ArtistData;
};

export type AlertConfig = {
  open: boolean;
  text: string;
};

export type Artist = {
  name: string;
  id: string;
  mbid: string;
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

export type Recording = {
  title: string;
  length: number;
  spotify: {
    uri: string;
  };
};

export type Release = {
  recordings: {
    nodes: Recording[];
  };
};

export type ReleaseGroup = {
  id: string;
  title: string;
  firstReleaseDate: string;
  releases: {
    nodes: Release[];
  };
};

export type ArtistLookupResponse = {
  lookup: {
    artist: {
      area: {
        name: string;
      };
      country: string | null;
      id: string;
      mbid: string;
      name: string;
      releaseGroups: {
        nodes: ReleaseGroup[];
        totalCount: number;
      };
    };
  };
};

export type Album = {
  title: string;
  date: string;
  tracks: Recording[];
};

export type ArtistData = {
  id: string;
  name: string;
  country: string;
  area: string;
  albums: Album[];
};

export type ArtistDetailsProps = {
  saved: FavouritesCollection | null;
  onSave: (id: string, data: ArtistData) => void;
  onRemove: (id: string) => void;
};
