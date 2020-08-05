import { useState } from 'react';
import { ArtistData } from '../types';
import { LOCAL_STORAGE_FAVOURITES_KEY as KEY } from '../utils/constants';
import { getFavourites } from '../utils/helpers';

type LocalStorageHook = [
  ArtistData | null,
  (value: ArtistData) => void,
  () => void,
  boolean
];

export default function useLocalStorage(artistId: string): LocalStorageHook {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const collection = getFavourites();
      const item = collection && collection[artistId];

      return item || null;
    } catch (error) {
      console.log(error); // eslint-disable-line
      return null;
    }
  });

  const setValue = (value: ArtistData): void => {
    try {
      setStoredValue(value);
      const collection = getFavourites();
      collection[artistId] = value;
      window.localStorage.setItem(KEY, JSON.stringify(collection));
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  const unsetValue = (): void => {
    try {
      const collection = getFavourites();
      if (collection[artistId]) delete collection[artistId];
      window.localStorage.setItem(KEY, JSON.stringify(collection));
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return [storedValue, setValue, unsetValue, !!storedValue];
}
