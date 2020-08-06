import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Tooltip } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

import MusicBrowser from './views/MusicBrowser';
import ArtistDetails from './views/ArtistDetails';
import Sidebar from './components/Sidebar';
import useLocalStorage from './hooks/useLocalStorage';

export const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  credits: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
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
            <Grid item xs={12} md={8}>
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
            <Grid item xs={12} md={4}>
              <Sidebar favourites={storedData} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.credits}>
            <Tooltip title="View on GitHub">
              <a
                href="https://github.com/wojciech-bak/react-graphql"
                rel="noopener norefferer"
                // eslint-disable-next-line react/jsx-no-target-blank
                target="_blank"
                className={classes.link}
              >
                <GitHub className={classes.icon} /> © Wojciech Bąk
              </a>
            </Tooltip>
          </Grid>
        </Container>
      </Router>
    </ApolloProvider>
  );
};

export default App;
