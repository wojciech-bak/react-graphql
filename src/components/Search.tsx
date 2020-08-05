import React, { useState, useEffect, FunctionComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { SearchOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import useDebounce from '../hooks/useDebounce';

// Debouncing inspired by:
// https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

const Search: FunctionComponent<{
  onSearch: (arr: string) => void;
  loading: boolean;
}> = ({ loading, onSearch }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div>
      <TextField
        id="search-input"
        label="Artist"
        variant="outlined"
        className={classes.input}
        disabled={loading}
        helperText="Enter the name of your favorite musician or band"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
        onChange={(e): void => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
