import { Box, Button, Grid, withStyles, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import * as modalAction from '../../actions/modal';
import * as taskAction from '../../actions/task';
import renderSelectField from '../FormHelper/SelectField';
import renderTextField from '../FormHelper/TextField';
import styles from './styles';

class TaskFormComp extends Component {
  closeModal = () => {
    const { modalActionCreator } = this.props;
    const { hideModal } = modalActionCreator;
    hideModal();
  };

  handleSubmitForm = values => {
    const { taskActionCreator, taskEditing } = this.props;
    const { title, description, status } = values;
    if (taskEditing) {
      taskActionCreator.updateTask(title, description, status);
    } else {
      taskActionCreator.addTask(title, description);
    }
  };

  renderStatusSelection = () => {
    let xhtml = null;
    const { taskEditing } = this.props;
    if (taskEditing) {
      xhtml = (
        <Field
          id="status"
          name="status"
          component={renderSelectField}
          label="Trạng thái"
          value="2"
        >
          <MenuItem value="0">Ready</MenuItem>
          <MenuItem value="1">In progress</MenuItem>
          <MenuItem value="2">Complete</MenuItem>
        </Field>
      );
    }
    return xhtml;
  };

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid item md={12}>
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
          <Field
            name="description"
            component={renderTextField}
            id="description"
            label="Mô tả"
            multiline
            rowsMax="4"
            className={classes.textField}
            margin="dense"
          />
        </Grid>
        {this.renderStatusSelection()}
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
  }),
  taskActionCreator: PropTypes.object,
  taskEditing: PropTypes.object
};

const mapStateToProps = state => {
  return {
    initialValues: {
      title: state.tasks.taskEditing ? state.tasks.taskEditing.title : null,
      description: state.tasks.taskEditing
        ? state.tasks.taskEditing.description
        : null,
      status: state.tasks.taskEditing ? state.tasks.taskEditing.status : null
    },
    taskEditing: state.tasks.taskEditing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalActionCreator: bindActionCreators(modalAction, dispatch),
    taskActionCreator: bindActionCreators(taskAction, dispatch)
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
