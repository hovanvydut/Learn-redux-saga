import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import styles from './styles';
import TaskItemComp from '../TaskItem';

class TaskListComp extends React.Component {
  render() {
    const { classes, tasks, status, onClickEdit } = this.props;
    return (
      <Grid item md={4} xs={12}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
          <div className={classes.wrapperListTask}>
            {tasks.map(task => {
              return (
                <TaskItemComp
                  task={task}
                  status={status}
                  key={task.id}
                  onClickEdit={() => onClickEdit(task)}
                />
              );
            })}
          </div>
        </Box>
      </Grid>
    );
  }
}

TaskListComp.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
  onClickEdit: PropTypes.func
};

export default withStyles(styles)(TaskListComp);
