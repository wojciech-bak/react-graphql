import { ArtistData, FavouritesCollection } from '../types';

const favouritesService = {
  LOCAL_STORAGE_FAVOURITES_KEY: 'MUSIC_BROWSER_FAVOURITE_ARTISTS',

  collectionAsArray(collection: FavouritesCollection | null): ArtistData[] {
    if (!collection) return [];

    return Object.keys(collection).map((key) => collection[key]);
  },

  getFavourite(id: string): ArtistData | null {
    const collection = this.getFavouritesCollection();
    const item = collection[id];

    return item || null;
  },

  addFavourite(id: string, item: ArtistData): void {
    const collection = this.getFavouritesCollection();

    collection[id] = item;

    this.saveFavouritesCollection(collection);
  },

  removeFavourite(id: string): void {
    const collection = this.getFavouritesCollection();

    if (collection[id]) delete collection[id];

    this.saveFavouritesCollection(collection);
  },

  saveFavouritesCollection(collection: FavouritesCollection): void {
    window.localStorage.setItem(
      this.LOCAL_STORAGE_FAVOURITES_KEY,
      JSON.stringify(collection)
    );
  },

  getFavouritesCollection(): { [index: string]: ArtistData } {
    const saved = window.localStorage.getItem(
      this.LOCAL_STORAGE_FAVOURITES_KEY
    );
    const collection = saved && JSON.parse(saved);

    return collection || {};
  },
};

export default favouritesService;
