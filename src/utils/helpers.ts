import { SearchResponse, ArtistEdge, PageInfo } from '../types';

export const extractEdges = (response?: SearchResponse): ArtistEdge[] => {
  const artists = response && response.search && response.search.artists;

  if (!artists) return [];

  return artists.edges;
};

export const extractPageInfo = (response?: SearchResponse): PageInfo => {
  const artists = response && response.search && response.search.artists;

  if (!artists) return { endCursor: '', hasNextPage: false };

  return artists.pageInfo;
};
