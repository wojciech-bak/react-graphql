import React from 'react';
import { Tooltip } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  star: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    color: '#edd328',
    cursor: 'pointer',
  },
}));

const StarButton: React.FunctionComponent<{
  isFavourite: boolean;
  action: () => void;
}> = ({ isFavourite, action }) => {
  const classes = useStyles();
  return !isFavourite ? (
    <Tooltip title="Add to favourites">
      <StarBorder className={classes.star} onClick={action} />
    </Tooltip>
  ) : (
    <Tooltip title="Remove from favourites">
      <Star className={classes.star} onClick={action} />
    </Tooltip>
  );
};

export default StarButton;
