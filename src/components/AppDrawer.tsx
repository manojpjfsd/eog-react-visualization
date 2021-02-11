import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import NavListLink from './NavListLink';
import DashboardIcon from '@material-ui/icons/Dashboard';


const useStyles = makeStyles(theme => ({
  drawer: {
    gridArea: 'drawer',
  },
  toolbar: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default props => {
  const classes = useStyles();
  return (
    <div className={classes.drawer}>
      <Divider />
      <List>
        <NavListLink to="/dashboard" title="Dashboard Visualization" icon={<DashboardIcon />} />
        <Divider />
      </List>
    </div>
  );
};
