import React from 'react';
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import styles from './styles';
import TaskBoard from '../TaskBoard';
import theme from '../../commons/theme';

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <TaskBoard />
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
