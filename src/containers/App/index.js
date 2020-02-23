import React from 'react';
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import styles from './styles';
import TaskBoard from '../TaskBoard';
import theme from '../../commons/theme';
import configStore from '../../redux/configStore';
import 'react-toastify/dist/ReactToastify.min.css';
import GlobalLoading from '../../components/GlobalLoading/index';
import ModalComp from '../../components/ModalComp';

const store = configStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <TaskBoard />
          <GlobalLoading />
          <ModalComp />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
