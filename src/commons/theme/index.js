import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  color: {
    primary: '#D32F2F',
    secondary: '#00BCD4',
    error: '#E64A19',
    textColor: 'white'
  },
  status: {
    danger: 'orange'
  },
  typography: {
    fontFamily: 'Roboto'
  },
  shape: {
    borderRadius: 4,
    backgroundColor: '#512DA8',
    textColor: '#fff',
    borderColor: '#ccc'
  }
});

export default theme;
