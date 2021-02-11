import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import ListItemRaw from '@material-ui/core/ListItem';
import ListItemIconRaw from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';

const listItemIconStyles = {
  root: {
    marginRight: 0,
  },
};
const ListItemIcon = withStyles(listItemIconStyles)(ListItemIconRaw);

const listItemStyles = (theme : any): any => ({
  [theme.breakpoints.down('xs')]: {
    root: {
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
});
const ListItem = withStyles(listItemStyles)(ListItemRaw);

const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '& svg': {
      color: 'white',
    },
  },
}));

export default ({ icon, title, to }) => {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const hideText = matches;

  return (
    <NavLink to={to} exact className={classes.link} activeClassName={classes.active}>
      <ListItem button>
        {icon && (
          <ListItemIcon>
            <Tooltip title={title} placement="right">
              {icon}
            </Tooltip>
          </ListItemIcon>
        )}
        {!hideText && <ListItemText primary={title} primaryTypographyProps={{ color: 'inherit' }} />}
      </ListItem>
    </NavLink>
  );
};
