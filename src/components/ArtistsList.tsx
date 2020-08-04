import React, { FunctionComponent } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ArtistsListProps } from '../types';

const ArtistsList: FunctionComponent<ArtistsListProps> = ({ artists }) => {
  return (
    <List>
      {artists.map(({ name, id, country, type }) => (
        <ListItem key={id} button>
          <ListItemText>
            {name} --- id: {id.slice(48)} --- country: {country} --- type:{' '}
            {type}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ArtistsList;
