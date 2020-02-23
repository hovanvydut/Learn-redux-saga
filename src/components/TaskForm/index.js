import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Box, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import styles from './styles';
import * as modalAction from '../../actions/modal';
import renderTextField from '../FormHelper/TextField';

class TaskFormComp extends Component {
  closeModal = () => {
    const { modalActionCreator } = this.props;
    const { hideModal } = modalActionCreator;
    hideModal();
  };

  handleSubmitForm = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid item md={12}>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tiêu đề"
            type="text"
            fullWidth
          /> */}
          <Field
            id="title"
            name="title"
            component={renderTextField}
            label="Tiêu đề"
            className={classes.textField}
            margin="normal"
          />
        </Grid>
        <Grid item md={12}>
          {/* <TextField
            id="standard-required"
            type="text"
            label="Mô tả"
            fullWidth
          /> */}
          <Field
            name="description"
            component={renderTextField}
            id="description"
            label="Mô tả"
            multiline
            rowsMax="4"
            className={classes.textField}
            margin="normal"
          />
        </Grid>
        <Grid item md={12}>
          <Box display="flex" flexDirection="row-reverse" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.closeModal}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </form>
    );
  }
}

TaskFormComp.propTypes = {
  modalActionCreator: PropTypes.shape({
    hideModal: PropTypes.func
  }),
  handleSubmit: PropTypes.func,
  classes: PropTypes.shape({
    textField: PropTypes.string
  })
};

const mapStateToProps = state => {
  return {
    abc: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalActionCreator: bindActionCreators(modalAction, dispatch)
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = 'TASK_MANAGEMENT';
const withReduxForm = reduxForm({
  form: FORM_NAME
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskFormComp);
