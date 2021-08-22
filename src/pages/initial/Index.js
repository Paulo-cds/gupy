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
import { useHistory } from "react-router-dom"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import useAuth from '../../state/auth'
import Container from '@material-ui/core/Container'
import Background from '../../images/index.jpg'

const useStyles = makeStyles({
  container:{
    width: '100%',
    height: '100vh',
    backgroundColor: '#c8c8c8',
    
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  root: {
    width: 300,
    height: 250,
    position: 'absolute',
    top: 'calc(50% - 300px/2)',
    left: 'calc(50% - 300px/2)',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0px 0px 30px black',
    opacity: .85,
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
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle:{
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '15px',
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    marginTop: 20 ,
    minWidth: 120,
    fontSize: '15px',
    width: 140,
  },
  inputQuest:{
    fontSize: '20px',
  },
});


const Index = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const history = useHistory()
  const {dataQuestions, setDataQuestions, 
    respostaAtual, setRespostaAtual,
    respostasCertas, setRespostasCertas} = useAuth()
  const [data, setData] = React.useState([])
  const [state, setState] = React.useState();

  const handleChange = (event) => {  
    const value = event.target.value
    setState(value);
    console.log(value)

    handleDialogOpen()
  };

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(!open);
  };

  const handleQuestions = () => {
    
    //history.push("/questions")
    handleDialogOpen()
    
    fetchData(state)
  }

  async function fetchData() {
    let response = await axios(`https://opentdb.com/api.php?amount=${state}`)
    await setDataQuestions(response.data.results);
    await history.push("/questions")
    
    /* console.log(data);
    setDataQuestions(data) */
    handleDialogOpen()
    // history.push("/questions")
  }

  return (
    <Container maxWidth="xl" className={classes.container} style={{backgroundImage: `url(${Background})` }}>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Welcome!
          </Typography>
          <Typography className={classes.subtitle}>
          Choose the number of questions you want to answer:
          </Typography>
          
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple" className={classes.inputQuest}>Questions</InputLabel>
            <Select
              native
              value={state}
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
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={fetchData} color="primary" autoFocus>
            Start
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}

export default Index