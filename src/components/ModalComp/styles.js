const styles = theme => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  },
  header: {
    backgroundColor: theme.color.primary,
    padding: theme.spacing(2),
    color: theme.color.textColor,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontWeight: 700
  },
  closeIcon: {},
  content: {
    padding: theme.spacing(2)
  }
});
export default styles;
