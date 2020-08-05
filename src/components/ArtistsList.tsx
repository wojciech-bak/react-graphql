import React, { FunctionComponent } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  PersonOutline,
  PeopleOutline,
  ChevronRightOutlined,
  FaceOutlined,
} from '@material-ui/icons';
import ReactCountryFlag from 'react-country-flag';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { ArtistsListProps } from '../types';

const useStyles = makeStyles((theme) => ({
  flag: {
    color: 'black',
    marginRight: theme.spacing(3),
  },
  item: {
    color: 'black',
  },
  link: {
    textDecoration: 'none',
  },
}));

const ArtistsList: FunctionComponent<ArtistsListProps> = ({ artists }) => {
  const classes = useStyles();

  return (
    <List>
      {artists.map(({ name, id, mbid, country, type }) => (
        <Link to={`/artist/${mbid}`} className={classes.link}>
          <ListItem key={id} button className={classes.item}>
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
              {type === 'Character' && (
                <Tooltip title={type}>
                  <FaceOutlined />
                </Tooltip>
              )}
            </ListItemIcon>
            <ListItemText>
              {!!country && (
                <ReactCountryFlag
                  countryCode={country}
                  className={classes.flag}
                />
              )}
              {name}
            </ListItemText>
            <ChevronRightOutlined />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default ArtistsList;
