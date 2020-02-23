import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';

class SearchBoxComp extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="Outlined"
          variant="outlined"
          className={classes.searchBar}
          onChange={handleChange}
        />
      </form>
    );
  }
}

SearchBoxComp.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func
};

// curry function
export default withStyles(styles)(SearchBoxComp);
