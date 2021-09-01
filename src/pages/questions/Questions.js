import { useState } from 'react'
import { useHistory } from "react-router-dom"
import Container from '@material-ui/core/Container'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';
import Background from '../../images/questions.png'
import Box from '@material-ui/core/Box'
import useAuth from '../../state/auth'


const useStyles = makeStyles({

  container:{
    width: '100%',
    height: '100vh',
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '200%',  
    display: 'flex',    
    justifyContent: 'center',
    

    '@media (max-width:780px)': { 
      display: 'block',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',      
      backgroundPosition: 'center',
      backgroundImage: `url(${Background})`,
      overflow: 'auto',
      overflowX: 'hidden',
    }
  },
  box:{
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width:'50%',
    backgroundPosition: 'center',
    display: 'flex',    
    justifyContent: 'center',

    '@media (max-width:780px)': { 
      display: 'none',
    }
  },
  boxCard:{
    width: '50%',
    display: 'flex',    
    justifyContent: 'center',
    

    '@media (max-width:780px)': {      
      width:'100%',      
    }
  },
  root: {
    width: '30rem',
    minHeight: 450,
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 400px/2)',
    right: '5%',    
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    boxShadow: '0px 0px 30px black',
    opacity: .85,

    '@media (max-width:780px)': { 
      width: '18rem',
      right: 'auto',
      height: 'fit-content',
    }
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },

  rootCheck: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
  button: {
    background: 'blue',
    color: 'white',
    right: 120,
    bottom: 5,
    position: 'absolute',
    fontSize: '1px',
    
  },
  buttonR: {
    background: 'blue',
    color: 'white',
    right: 5,
    bottom: 5,
    position: 'absolute',
    fontSize: '1px',    
  },
  number:{
    color: 'black',
    left: 15,
    bottom: 5,
    position: 'absolute',
    fontSize: '15px',
  },
  form: {
    left: '12%',
    bottom: '15%',
    position: 'absolute',
  },
  resposta: {
    marginBottom: 5,
    fontWeight: 'bolder',
    color: 'black',
  },
});






const Questions = () => {
    const classes = useStyles();
    const [array, setArray] = useState(0)
    const [displayResultado, setDisplayResultado] = useState(true)
    const [displayNext, setDisplayNext] = useState(true)
    const {dataQuestions} = useAuth()
    const [form, setForm] = useState ()
    const {respostasCertas, setRespostasCertas }= useAuth()
    const {respostaAtual, setRespostaAtual }= useAuth()
    const history = useHistory()
    
    function StyledRadio(props) {
      const classes = useStyles();
    
      return (
        <Radio
          className={classes.rootCheck}
          disableRipple
          color="default"
          checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
          icon={<span className={classes.icon} />}
          {...props}
        />
      );
    }

    const respostas = dataQuestions[array].incorrect_answers.concat(dataQuestions[array].correct_answer)
    const respostaAleatoria = respostas.sort()
    
    

    const mostraRespostas = () => {            
      localStorage.setItem('QuestAnt', JSON.stringify(respostaAtual))
      localStorage.setItem('QtdQuestAnt', JSON.stringify(respostasCertas))
      history.push("/result")
    }

    const somaArray = () => {
      setDisplayNext(!displayNext)
      setRespostaAtual(respostaAtual.concat({
        Pergunta: dataQuestions[array].question,
        Resposta: form,
        RespostaCorreta: dataQuestions[array].correct_answer,
        RespostaAleatoria: respostaAleatoria,
      }))

      if(form === dataQuestions[array].correct_answer){
        setRespostasCertas(respostasCertas + 1)
      }

      if(array + 1 < dataQuestions.length){
      setArray(array+1)          
      } else {        
        setDisplayResultado(!displayResultado)
        setDisplayNext(!displayNext)
      }
    }


    

    const onChange = (e) => {      
      
      setForm(e.target.value)      
      setDisplayNext(!displayNext)
       
    }

    return(
      <Container maxWidth="false" className={classes.container} >
        <Box className={classes.box} style={{backgroundImage: `url(${Background})` }}/>
        <Box className={classes.boxCard}>
        <Card className={classes.root}>          
            <CardContent>
               <Typography className={classes.title} gutterBottom dangerouslySetInnerHTML={ { __html: `<b>Category:</b> ${dataQuestions[array].category}` } }/>
                

                <Typography dangerouslySetInnerHTML={{ __html: `<b>Difficulty:</b> ${dataQuestions[array].difficulty}` }} />
                  
                <Typography className={classes.pos} dangerouslySetInnerHTML={{ __html: `<b>Question:</b> ${dataQuestions[array].question}` }} />
                  
                
                <FormControl className={classes.form} component="fieldset">
                  <FormLabel className={classes.resposta}>Answer:</FormLabel>
                  <RadioGroup aria-label="gender" name="customized-radios">

                    {respostaAleatoria.map((resposta) => 
                      <FormControlLabel 
                      value= {(resposta)} 
                      control={<StyledRadio />} 
                      label={<span dangerouslySetInnerHTML={{ __html: resposta }} />}
                      name={`question${array}`}
                      onChange={onChange}
                    />
                    )}
                    

                  </RadioGroup>
                </FormControl>
            </CardContent>       

            <Button variant="contained" className={classes.button} disabled={displayNext} onClick={somaArray}>
              Next
            </Button>   
            <Button variant="contained" className={classes.buttonR} disabled={displayResultado} onClick={mostraRespostas}>
              Result
            </Button>  
            <p className={classes.number}> {`${array + 1} de ${dataQuestions.length}`}</p>
        </Card>
            
        </Box>
      </Container>
    )
}

export default Questions