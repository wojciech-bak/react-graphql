import { compareAsc } from 'date-fns';
import {
  SearchResponse,
  ArtistEdge,
  PageInfo,
  ReleaseGroup,
  Album,
  ArtistLookupResponse,
  ArtistData,
} from '../types';

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

export const formatAlbums = (groups: ReleaseGroup[]): Album[] => {
  return groups
    .map((group: ReleaseGroup) => {
      const { title, firstReleaseDate: date, releases } = group;
      const tracks = releases?.nodes[0]?.recordings.nodes;

      return { title, date, tracks };
    })
    .sort((albumA, albumB) => {
      const dateA = Date.parse(albumA.date);
      const dateB = Date.parse(albumB.date);

      return compareAsc(dateA, dateB);
    });
};

export const extractArtistDetails = (
  response: ArtistLookupResponse
): ArtistData | null => {
  const artist = response?.lookup?.artist;

  if (!artist) return null;

  const id = artist.mbid || '';
  const name = artist.name || '';
  const country = artist.country || '';
  const area = (artist.area && artist.area.name) || '';
  const albums = formatAlbums(artist.releaseGroups.nodes);

  return { id, name, country, area, albums };
};

export const updateSearchQuery = (
  prevResult: SearchResponse,
  { fetchMoreResult: newResult }: { fetchMoreResult?: SearchResponse }
): SearchResponse => {
  const newEdges = extractEdges(newResult);
  const pageInfo = extractPageInfo(newResult);
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
