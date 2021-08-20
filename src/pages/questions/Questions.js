import {useEffect, useState} from 'react'
import axios from 'axios'
import Container from '@material-ui/core/Container'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
  },
  box:{
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width:'50%',
    backgroundPosition: 'center',
  },
  boxCard:{
    width: '50%',
  },
  root: {
    width: 500,
    minHeight: 400,
    display: 'block',
    position: 'absolute',
    top: 'calc(50% - 400px/2)',
    right: '5%',    
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    boxShadow: '0px 0px 30px black',
    opacity: .85,
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
    const [resultado, setResultado] = useState('none')
    const [displayNext, setDisplayNext] = useState('block')
    const {dataQuestions} = useAuth()
    console.log(`data no questions ${dataQuestions.length}`)
    
    const [form, setForm] = useState ({
      user:{
          value: '',
          error: false,
      },
      password:{
          value:'',
          error: false,
      },
    })
    
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
    
    

    const somaArray = () => {
      if(array + 1 < dataQuestions.length){
      setArray(array+1)
      
      } else {
        setResultado('block')
        setDisplayNext('none')
      }
    }
    

    const onChange = (e) => {
      const {name, value} = e.target

        setForm({
          ...form,
          [name]:{
            value,
          },
        })
       
    }

    return(
      <Container maxWidth="false" className={classes.container} >
        <Box className={classes.box} style={{backgroundImage: `url(${Background})` }}/>
        <Box className={classes.boxCard}>
        <Card className={classes.root}>          
            <CardContent>
               <Typography className={classes.title} gutterBottom dangerouslySetInnerHTML={ { __html: `<b>Categoria:</b> ${dataQuestions[array].category}` } }/>
                

                <Typography dangerouslySetInnerHTML={{ __html: `<b>Dificuldade:</b> ${dataQuestions[array].difficulty}` }} />
                  
                <Typography className={classes.pos} dangerouslySetInnerHTML={{ __html: `<b>Pergunta:</b> ${dataQuestions[array].question}` }} />
                  
                
                <FormControl className={classes.form} component="fieldset">
                  <FormLabel className={classes.resposta}>Resposta:</FormLabel>
                  <RadioGroup aria-label="gender" name="customized-radios">

                    {respostaAleatoria.map((resposta) => 
                      <FormControlLabel 
                      value= {(resposta)} 
                      control={<StyledRadio />} 
                      label={(resposta)}
                      name={`question${array}`}
                      onChange={onChange}
                    />
                    )}
                    

                  </RadioGroup>
                </FormControl>
            </CardContent>       

            <Button variant="contained" className={classes.button} style={{display:displayNext}} onClick={somaArray}>
              Próxima Questão
            </Button>   
            <Button variant="contained" className={classes.button} style={{display:resultado}}>
              Resultado
            </Button>  
            <p className={classes.number}> {`${array + 1} de ${dataQuestions.length}`}</p>
        </Card>
            
        </Box>
      </Container>
    )
}

export default Questions