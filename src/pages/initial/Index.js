import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from "react-router-dom"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import axios from 'axios'
import useAuth from '../../state/auth'
import Container from '@material-ui/core/Container'
import Background from '../../images/index.jpg'



const QuestAnt = localStorage.getItem('QuestAnt')
 
 let editors = 'none'
  
  if(QuestAnt){
    editors = 'flex'
  } else {
    editors = 'none'
  }


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
  review:{    
    position: 'absolute',
    top: 15,
    left: 15,
    width: 150,
    background: 'blue',
    color: 'white',
    fontSize: '2px',        
  },
  reviewSpan:{
    fontSize: 15,
    fontWeight: 'bold',
  }
  
});


const Index = () => {
  const classes = useStyles();  
  const history = useHistory()
  const {dataQuestions, setDataQuestions,     
    respostasCertas, setRespostasCertas ,
    respostaAtual, setRespostaAtual,
    respostaAnterior, setRespostaAnterior} = useAuth()
  
  
  const [state, setState] = useState();

  

  
  const handleChange = (event) => {  
    const value = event.target.value
    setState(value);    
    handleDialogOpen()
  };

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(!open);
  };



  async function fetchData() {
    let response = await axios(`https://opentdb.com/api.php?amount=${state}`)
    await setDataQuestions(response.data.results);
    await history.push("/questions")        
    handleDialogOpen()    
  }

  const handleAnterior = () => {
    history.push("/after")
  }

  return (
    <Container maxWidth="xl" className={classes.container} style={{backgroundImage: `url(${Background})` }}>
      <Button className={classes.review} onClick={handleAnterior} autoFocus style={{display: editors}}>
        <span className={classes.reviewSpan}>Previous</span>
      </Button>
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