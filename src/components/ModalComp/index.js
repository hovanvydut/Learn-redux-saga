import React, { Component } from 'react';
import { withStyles, Modal, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import styles from './styles';
import * as modalActions from '../../actions/modal';

class ModalComp extends Component {
  render() {
    const { classes, open, component, modalActionCreator, title } = this.props;
    const { hideModal } = modalActionCreator;
    return (
      <Modal open={open}>
        <Grid container spacing={1}>
          <div className={classes.modal}>
            <div className={classes.header}>
              <span className={classes.title}>{title}</span>
              <CloseIcon className={classes.closeIcon} onClick={hideModal} />
            </div>
            <div className={classes.content}>{component}</div>
          </div>
        </Grid>
      </Modal>
    );
  }
}

ModalComp.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  modalActionCreator: PropTypes.shape({
    hideModal: PropTypes.func
  }),
  title: PropTypes.string,
  component: PropTypes.object
};

const mapStateToProps = state => {
  return {
    title: state.modal.title,
    open: state.modal.showModal,
    component: state.modal.component
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalActionCreator: bindActionCreators(modalActions, dispatch)
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(ModalComp);
