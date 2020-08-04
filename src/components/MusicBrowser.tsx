import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Search from './Search';
import ArtistsList from './ArtistsList';
import useArtists from '../utils/useArtists.hook';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MusicBrowser: React.FunctionComponent = () => {
  const classes = useStyles();
  const [searchPhrase, setSearchPhrase] = useState('');
  const { artists, loading, loadArtists, loadMore } = useArtists(searchPhrase);

  const handleSearch = (phrase: string): void => {
    setSearchPhrase(phrase);
  };

  useEffect(() => {
    loadArtists();
  }, [loadArtists, searchPhrase]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Search artists
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Search onSearch={handleSearch} />
            {loading && <div>loading...</div>}
            <ArtistsList artists={artists} />
            <button type="button" onClick={loadMore}>
              LOAD MORE
            </button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MusicBrowser;
