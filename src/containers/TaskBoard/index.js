import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles';
import { STATUSES } from '../../constants';
import TaskList from '../../components/TaskList';
import TaskFormComp from '../../components/TaskForm';

const listTask = [
    {
        id: 1,
        title: 'Read Book',
        description: 'Read material UI book',
        status: 0
    },
    {
        id: 2,
        title: 'Play football',
        description: 'Read material UI book',
        status: 2
    },
    {
        id: 3,
        title: 'Play game',
        description: 'Read material UI book',
        status: 1
    }
];

class TaskBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    openForm = () => {
        this.setState({ open: true });
    };

    renderBoard() {
        let xhtml = null;
        xhtml = (
            <Grid container spacing={2}>
                {STATUSES.map(status => {
                    const taskFilter = listTask.filter(
                        task => task.status === status.value
                    );
                    return (
                        <TaskList
                            status={status}
                            tasks={taskFilter}
                            key={status.value}
                        />
                    );
                })}
            </Grid>
        );
        return xhtml;
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
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
                {this.renderBoard()}
                <TaskFormComp open={open} handleClose={this.handleClose} />
            </div>
        );
    }
}

TaskBoard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskBoard);
