import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs } from '@material-ui/core';
import { ArrowBackOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  backlink: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
  },
}));

const GoBackButton: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" to="/" className={classes.backlink}>
        <ArrowBackOutlined /> Home
      </Link>
    </Breadcrumbs>
  );
};

export default GoBackButton;
