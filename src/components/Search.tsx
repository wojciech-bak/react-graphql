import React, { useState, useEffect, FunctionComponent } from "react";
import TextField from '@material-ui/core/TextField';
import useDebounce from '../utils/useDebounce.hook';
import { Artist } from "../types";
import { searchArtists, extractArtistsFromResponse } from '../utils/search.helpers';

// Debouncing inspired by:
// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

const Search: FunctionComponent<{ onSearch: (arr: Artist[]) => void }> = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([] as Artist[]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchArtists(debouncedSearchTerm)
            .then(({ data, error }) => {
                setIsSearching(false);

                if (error) console.log(error);

                const artists: Artist[] = extractArtistsFromResponse(data);
                setArtists(artists);
            });
      } else {
        setArtists([]);
      }
    },
    [debouncedSearchTerm]
  );

  useEffect(() => {
      props.onSearch(artists);
  }, [artists, props])

    return (
        <div>
            <TextField 
                id="search-input" 
                label="Artist" 
                variant="outlined" 
                onChange={e => setSearchTerm(e.target.value)}
            />
    
            {isSearching && <div>Searching ...</div>}
        </div>
      );
}

export default Search;