import { useState, useCallback, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { ArtistData, FavouritesCollection } from '../types';
import { extractArtistDetails } from '../utils/helpers';
import queries from '../utils/queries';

type ArtistDetailsHook = {
  isFavourite: boolean;
  details: ArtistData;
  loading: boolean;
  error: Error;
};

export default function useArtistDetails(
  artistId: string,
  saved: FavouritesCollection | null
): ArtistDetailsHook {
  const { ARTIST_DETAILS_QUERY: query } = queries;
  const [details, setDetails] = useState({} as ArtistData);
  const [error, setError] = useState((null as unknown) as Error);
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const isFavourite = !!(saved && saved[artistId]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error: e } = await client.query({
        query,
        variables: { mbid: artistId },
      });

      if (e) setError(e);

      if (data) {
        const formatted = extractArtistDetails(data);
        if (formatted) setDetails(formatted);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }, [artistId, client, query]);

  useEffect(() => {
    if (saved && saved[artistId]) {
      setDetails(saved[artistId]);
    } else {
      loadData();
    }
  }, [setDetails, artistId, loadData, saved]);

  return { isFavourite, loading, error, details };
}
