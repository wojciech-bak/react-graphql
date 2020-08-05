import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Search from './Search';
import ArtistsList from './ArtistsList';
import Preloader from './Preloader';
import useArtists from '../utils/useArtists.hook';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  heading: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  subheading: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

const MusicBrowser: React.FunctionComponent = () => {
  const classes = useStyles();
  const [searchPhrase, setSearchPhrase] = useState('');
  const [initialized, setInitialized] = useState(false);
  const { artists, loading, hasNextPage, loadArtists, loadMore } = useArtists(
    searchPhrase
  );

  const handleSearch = (phrase: string): void => {
    if (phrase.length > 0 && !initialized) setInitialized(true);
    setSearchPhrase(phrase);
  };

  useEffect(() => {
    if (initialized) loadArtists();
  }, [loadArtists, initialized]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h1" className={classes.heading}>
            Welcome to music browser!
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              component="h2"
              className={classes.subheading}
            >
              Explore the world of music thanks to{' '}
              <a href="https://graphbrainz.herokuapp.com">Graphbrainz</a>
            </Typography>
            <Search onSearch={handleSearch} loading={loading} />
            {loading && <Preloader />}
            <ArtistsList artists={artists} />
            {artists.length > 0 && hasNextPage && (
              <Button color="primary" onClick={loadMore}>
                Load more
              </Button>
            )}
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
