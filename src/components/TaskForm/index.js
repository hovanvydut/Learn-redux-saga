import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';
import styles from './styles';

class TaskFormComp extends Component {
    handleClose = () => {
        const { handleClose } = this.props;
        handleClose();
    };

    render() {
        const { open } = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Required"
                        defaultValue="Hello World"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

TaskFormComp.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default withStyles(styles)(TaskFormComp);
