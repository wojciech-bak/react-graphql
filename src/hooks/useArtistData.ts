import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ArtistData } from '../types';
import { extractArtistDetails } from '../utils/helpers';
import queries from '../utils/queries';
import useLocalStorage from './useLocalStorage';

type ArtistDataHook = {
  loading: boolean;
  error?: Error;
  details: ArtistData;
  saved: boolean;
  addToFavourites: (value: ArtistData) => void;
  removeFromFavourites: () => void;
};

export default function useArtistData(mbid: string): ArtistDataHook {
  const { ARTIST_DETAILS_QUERY: query } = queries;
  const [details, setDetails] = useState({} as ArtistData);
  const [
    favouriteArtist,
    addToFavourites,
    removeFromFavourites,
    saved,
  ] = useLocalStorage(mbid);
  const [loadArtistData, { loading, data, error }] = useLazyQuery(query, {
    variables: { mbid },
  });

  useEffect(() => {
    if (favouriteArtist) {
      setDetails(favouriteArtist);
    } else {
      loadArtistData();
    }
  }, [favouriteArtist, loadArtistData]);

  useEffect(() => {
    const formatted = extractArtistDetails(data);
    if (formatted) setDetails(formatted);
  }, [data]);

  return {
    loading,
    error,
    details,
    saved,
    addToFavourites,
    removeFromFavourites,
  };
}
