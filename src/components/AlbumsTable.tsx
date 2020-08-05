import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { Album } from '../types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const AlbumsTable: React.FunctionComponent<{ albums: Album[] }> = ({
  albums,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Release date</TableCell>
            <TableCell align="right">Tracks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {albums.map((album) => (
            <TableRow key={`${album.title}-${album.date}`}>
              <TableCell component="th" scope="row">
                {album.title}
              </TableCell>
              <TableCell align="right">{album.date}</TableCell>
              <TableCell align="right">
                {album.tracks?.length || 'Unknown'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AlbumsTable;
