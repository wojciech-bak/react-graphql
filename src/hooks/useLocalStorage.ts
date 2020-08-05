import { useState } from 'react';
import { ArtistData, FavouritesCollection } from '../types';
import service from '../utils/favouritesService';

type LocalStorageHook = {
  storedData: FavouritesCollection | null;
  addToFavourites: (id: string, item: ArtistData) => void;
  removeFromFavourites: (id: string) => void;
};

export default function useLocalStorage(): LocalStorageHook {
  const [storedData, setStoredData] = useState(() => {
    try {
      return service.getFavouritesCollection();
    } catch (error) {
      console.log(error); // eslint-disable-line
      return null;
    }
  });

  const addToFavourites = (id: string, value: ArtistData): void => {
    try {
      service.addFavourite(id, value);
      setStoredData(service.getFavouritesCollection());
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  const removeFromFavourites = (id: string): void => {
    try {
      service.removeFavourite(id);
      setStoredData(service.getFavouritesCollection());
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return { storedData, addToFavourites, removeFromFavourites };
}
