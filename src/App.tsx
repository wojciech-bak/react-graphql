import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MusicBrowser from './views/MusicBrowser';
import ArtistDetails from './views/ArtistDetails';

export const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com',
  cache: new InMemoryCache(),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    marginTop: theme.spacing(5),
  },
}));

const App: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Switch>
                <Route path="/artist/:artistId">
                  <ArtistDetails />
                </Route>
                <Route path="/">
                  <MusicBrowser />
                </Route>
              </Switch>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
          </Grid>
        </Container>
      </Router>
    </ApolloProvider>
  );
};

export default App;
