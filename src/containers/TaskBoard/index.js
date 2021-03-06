import { Box, Button, Grid, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import * as modalAction from '../../actions/modal';
import * as taskAction from '../../actions/task';
import SearchBox from '../../components/SearchBox';
import TaskFormComp from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import { STATUSES } from '../../constants';
import styles from './styles';

class TaskBoard extends Component {
  componentDidMount() {
    const { actionCreator } = this.props;
    // actionCreator.fetchListTaskMid();
    actionCreator.fetchListTask();
  }

  openForm = () => {
    const { modalActionCreator, actionCreator } = this.props;
    const { setTaskEditing } = actionCreator;
    const {
      showModal,
      changeModalContent,
      changeModalTitle
    } = modalActionCreator;

    setTaskEditing(null);
    showModal();
    changeModalTitle('Thêm mới công việc');
    changeModalContent(<TaskFormComp />);
  };

  showToast = () => {
    toast.error('hello vy');
  };

  // expression function
  loadData = () => {
    const { actionCreator } = this.props;
    actionCreator.fetchListTask();
  };

  handleChangeSearchBox = e => {
    const keyword = e.target.value;
    const { actionCreator } = this.props;
    const { filterTask } = actionCreator;
    filterTask(keyword);
  };

  handleEditTask = task => {
    const { actionCreator, modalActionCreator } = this.props;
    const { setTaskEditing } = actionCreator;
    setTaskEditing(task);
    const {
      showModal,
      changeModalContent,
      changeModalTitle
    } = modalActionCreator;

    setTaskEditing(task);
    showModal();
    changeModalTitle('Chỉnh sửa công việc');
    changeModalContent(<TaskFormComp />);
  };

  renderSearchBox() {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleChangeSearchBox} />;
    return xhtml;
  }

  renderBoard() {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map(status => {
          const taskFilter = listTask.filter(
            task => Number(task.status) === status.value
          );
          return (
            <TaskList
              status={status}
              tasks={taskFilter}
              key={status.value}
              onClickEdit={this.handleEditTask}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon />
          &nbsp; Thêm mới công việc
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={this.loadData}
        >
          Load data
        </Button>
        <Box mt={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.showToast}
          >
            Notify
          </Button>
        </Box>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  actionCreator: PropTypes.object,
  listTask: PropTypes.array,
  filterTask: PropTypes.func,
  modalActionCreator: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func
  })
};

const mapStateToProps = state => {
  return {
    listTask: state.tasks.listTask
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionCreator: bindActionCreators(taskAction, dispatch),
    modalActionCreator: bindActionCreators(modalAction, dispatch)
    // actionCreator: () => {
    //   dispatch(taskAction.fetchListTask());
    // }
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
