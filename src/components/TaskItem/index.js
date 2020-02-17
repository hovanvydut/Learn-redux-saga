import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Fab,
    Icon
} from '@material-ui/core';
import styles from './styles';

class TaskItemComp extends React.Component {
    render() {
        const { classes, task, status } = this.props;
        return (
            <Card key={task.id} className={classes.card}>
                <CardContent>
                    <Grid container justify="space-between">
                        <Grid item md={8}>
                            <Typography component="h2">{task.title}</Typography>
                        </Grid>
                        <Grid item md={4}>
                            {status.label}
                        </Grid>
                    </Grid>
                    <p>{task.description}</p>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <Fab color="primary" aria-label="add" size="small">
                        <Icon fontSize="small">edit_icon</Icon>
                    </Fab>
                    <Fab color="primary" aria-label="add" size="small">
                        <Icon fontSize="small">delete_icon</Icon>
                    </Fab>
                </CardActions>
            </Card>
        );
    }
}

TaskItemComp.propTypes = {
    classes: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskItemComp);
