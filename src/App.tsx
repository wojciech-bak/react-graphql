import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

import MusicBrowser from './views/MusicBrowser';
import ArtistDetails from './views/ArtistDetails';
import Sidebar from './components/Sidebar';
import useLocalStorage from './hooks/useLocalStorage';

export const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com',
  cache: new InMemoryCache(),
});

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
}));

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  const {
    storedData,
    addToFavourites,
    removeFromFavourites,
  } = useLocalStorage();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Switch>
                <Route path="/artist/:artistId">
                  <ArtistDetails
                    saved={storedData}
                    onSave={addToFavourites}
                    onRemove={removeFromFavourites}
                  />
                </Route>
                <Route path="/">
                  <MusicBrowser />
                </Route>
              </Switch>
            </Grid>
            <Grid item xs={4}>
              <Sidebar favourites={storedData} />
            </Grid>
          </Grid>
        </Container>
      </Router>
    </ApolloProvider>
  );
};

export default App;
