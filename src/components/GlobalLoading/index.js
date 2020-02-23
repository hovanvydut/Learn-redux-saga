import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from './styles';
import LoadingIcon from '../../assets/images/loading.gif';

class GlobalLoadingComp extends React.Component {
  render() {
    const { classes, showLoading } = this.props;
    let xhtml = null;
    if (showLoading)
      xhtml = (
        <div className={classes.globalLoading}>
          <img src={LoadingIcon} alt="loading icon" className={classes.icon} />
        </div>
      );
    return xhtml;
  }
}

GlobalLoadingComp.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    showLoading: state.ui.showLoading
  };
};

const withConnect = connect(mapStateToProps, null);

export default compose(withStyles(styles), withConnect)(GlobalLoadingComp);
