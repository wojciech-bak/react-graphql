import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AlbumsTable from '../components/AlbumsTable';
import Preloader from '../components/Preloader';
import GoBackButton from '../components/GoBackButton';
import { ArtistDetailsProps } from '../types';
import StarButton from '../components/StarButton';
import useToasts from '../hooks/useToasts';
import useArtistDetails from '../hooks/useArtistDetails';

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
}));

const ArtistDetails: React.FunctionComponent<ArtistDetailsProps> = ({
  saved,
  onSave,
  onRemove,
}) => {
  const classes = useStyles();
  const { artistId } = useParams();
  const { details, error, loading, isFavourite } = useArtistDetails(
    artistId,
    saved
  );
  const { alert, showAlert } = useToasts();

  const starBtnAction = isFavourite
    ? (): void => {
        onRemove(artistId);
        showAlert('Successfully removed from favourites');
      }
    : (): void => {
        onSave(artistId, details);
        showAlert('Successfully added to favourites');
      };

  if (error) {
    return (
      <Paper className={classes.paper}>
        <GoBackButton />
        <Typography variant="h5" component="h5">
          Error : (
        </Typography>
      </Paper>
    );
  }

  if (loading) {
    return (
      <Paper className={classes.paper}>
        <GoBackButton />
        <Preloader />
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <GoBackButton />

      <Snackbar open={alert.open}>
        <MuiAlert severity="success">{alert.text}</MuiAlert>
      </Snackbar>

      <StarButton isFavourite={isFavourite} action={starBtnAction} />

      <Typography variant="h3" component="h3" className={classes.title}>
        {details.name}
      </Typography>

      <Typography variant="h6" component="h6" className={classes.subheading}>
        Location: {` ${details.country} ${details.area}`}
      </Typography>

      <Typography
        variant="h5"
        align="left"
        component="h4"
        className={classes.subheading}
      >
        Albums {details.albums && `(${details.albums.length})`}
      </Typography>

      <AlbumsTable albums={details.albums || []} />
    </Paper>
  );
};

export default ArtistDetails;
