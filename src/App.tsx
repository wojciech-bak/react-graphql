import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MusicBrowser from './components/MusicBrowser';

export const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com',
  cache: new InMemoryCache(),
});

const App: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={client}>
      <MusicBrowser />
    </ApolloProvider>
  );
};

export default App;
