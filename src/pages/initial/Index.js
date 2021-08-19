import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  root: {
    width: 300,
    position: 'absolute',
    top: '35%',
    left: '35%',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    margin: '0 auto',
    textalign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  subTitle:{
    display: 'flex',
    flexWrap: 'wrap',
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
});


const Index = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [state, setState] = React.useState({
    questions: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log(event.target.value)

    handleDialogOpen()
  };

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Seja bem-vindo!
          </Typography>
          <Typography variant="h5" component="h5" className={classes.subtitle}>
            Escolha a quantidade de perguntas que deseja responder:
          </Typography>
          
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple">Perguntas</InputLabel>
            <Select
              native
              value={state.questions}
              onChange={handleChange}
              inputProps={{
                name: 'questions',
                id: 'filled-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Dialog
        open={open}        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/*<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>*/}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza da quantidade de perguntas?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogOpen} color="primary" autoFocus>
            Start
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

export default Index