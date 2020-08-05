import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Paper, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import favouritesService from '../utils/favouritesService';
import { FavouritesCollection } from '../types';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  activeLink: {
    textDecoration: 'none',
    cursor: 'default',
    color: theme.palette.text.disabled,
  },
}));

const Sidebar: React.FunctionComponent<{
  favourites: FavouritesCollection | null;
}> = ({ favourites }) => {
  const classes = useStyles();
  const match = useRouteMatch<{ id: string }>('/artist/:id');
  const id = match && match.params && match.params.id;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Favourite artists</Typography>
      <List>
        {favouritesService
          .collectionAsArray(favourites)
          .map((artist, index) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className={artist.id === id ? classes.activeLink : ''}
            >
              <ListItem>
                {index + 1}. {artist.name}
              </ListItem>
            </Link>
          ))}
      </List>
    </Paper>
  );
};

export default Sidebar;
