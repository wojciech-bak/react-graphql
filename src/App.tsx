import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import ArtistsList from './components/ArtistsList';
import Search from './components/Search';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Artist } from './types';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com',
  cache: new InMemoryCache()
});

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  const [artists, setArtists] = useState([] as Artist[]);

  const handleSearch = (artists: Artist[]) => {
    setArtists(artists);
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Search artists
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Search onSearch={handleSearch} />
            <ArtistsList artists={artists} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
