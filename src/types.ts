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

export type SearchResponse = {
  search: {
    artists: {
      nodes: Artist[];
      pageInfo: {
        endCursor: string;
      };
    };
  };
};
