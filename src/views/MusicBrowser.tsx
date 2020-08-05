import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Search from '../components/Search';
import ArtistsList from '../components/ArtistsList';
import Preloader from '../components/Preloader';
import useArtists from '../hooks/useArtists';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h2" className={classes.subheading}>
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
  );
};

export default MusicBrowser;
