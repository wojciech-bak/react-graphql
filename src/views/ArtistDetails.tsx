import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Breadcrumbs, Tooltip } from '@material-ui/core';
import { StarBorder, Star, ArrowBackOutlined } from '@material-ui/icons';
import AlbumsTable from '../components/AlbumsTable';
import Preloader from '../components/Preloader';
import useArtistData from '../hooks/useArtistData';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  subheading: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  backlink: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    color: '#edd328',
    cursor: 'pointer',
  },
}));

const ArtistDetails: React.FunctionComponent = () => {
  const classes = useStyles();
  const { artistId } = useParams();
  const {
    loading,
    error,
    details,
    saved,
    addToFavourites,
    removeFromFavourites,
  } = useArtistData(artistId);

  if (error) return <div> ERROR </div>;

  const breadcrumbs = (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="/" className={classes.backlink}>
        <ArrowBackOutlined /> Home
      </Link>
    </Breadcrumbs>
  );

  const artistName = (
    <Typography variant="h3" component="h3" className={classes.title}>
      {details.name}
    </Typography>
  );

  const addToFavouritesBtn = (
    <Tooltip title="Add to favourites">
      <StarBorder
        className={classes.star}
        onClick={(): void => {
          addToFavourites(details);
        }}
      />
    </Tooltip>
  );

  const removeFromFavouritesBtn = (
    <Tooltip title="Remove from favourites">
      <Star
        className={classes.star}
        onClick={(): void => {
          removeFromFavourites();
        }}
      />
    </Tooltip>
  );

  const location = (
    <Typography variant="h6" component="h6" className={classes.subheading}>
      Location: {` ${details.country} ${details.area}`}
    </Typography>
  );

  const albumsTableHeading = (
    <Typography
      variant="h5"
      align="left"
      component="h4"
      className={classes.subheading}
    >
      Albums {details.albums && `(${details.albums.length})`}
    </Typography>
  );

  return (
    <Paper className={classes.paper}>
      {breadcrumbs}

      {loading && <Preloader />}

      {!loading && !saved && addToFavouritesBtn}

      {!loading && saved && removeFromFavouritesBtn}

      {!loading && artistName}

      {!loading && location}

      {!loading && albumsTableHeading}

      {!loading && <AlbumsTable albums={details.albums || []} />}
    </Paper>
  );
};

export default ArtistDetails;
