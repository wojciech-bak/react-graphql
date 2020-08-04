import React, { useState, useEffect, FunctionComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import useDebounce from '../utils/useDebounce.hook';

// Debouncing inspired by:
// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

const Search: FunctionComponent<{ onSearch: (arr: string) => void }> = (
  props
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      props.onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, props]);

  return (
    <div>
      <TextField
        id="search-input"
        label="Artist"
        variant="outlined"
        onChange={(e): void => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
