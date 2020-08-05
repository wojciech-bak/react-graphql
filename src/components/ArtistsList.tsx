import React, { FunctionComponent } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { PersonOutline, PeopleOutline } from '@material-ui/icons';
import ReactCountryFlag from 'react-country-flag';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { ArtistsListProps } from '../types';

const useStyles = makeStyles((theme) => ({
  flag: {
    color: 'black',
    marginRight: theme.spacing(3),
  },
}));

const ArtistsList: FunctionComponent<ArtistsListProps> = ({ artists }) => {
  const classes = useStyles();

  return (
    <List>
      {artists.map(({ name, id, country, type }) => (
        <ListItem key={id} button>
          <ListItemIcon>
            {type === 'Person' && (
              <Tooltip title={type}>
                <PersonOutline />
              </Tooltip>
            )}
            {type === 'Group' && (
              <Tooltip title={type}>
                <PeopleOutline />
              </Tooltip>
            )}
          </ListItemIcon>
          <ListItemText>
            <ReactCountryFlag countryCode={country} className={classes.flag} />
            {name} --- id: {id.slice(48)} --- type: {type}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ArtistsList;
