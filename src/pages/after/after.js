import Container from '@material-ui/core/Container'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Background from '../../images/questions.jpeg'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles({

  container:{
    width: '100%',
    height: '100vh',
    backgroundColor: 'black',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',  
    display: 'flex',    
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    overflow: 'auto',
    overflowX: 'hidden',

    '@media (max-width:780px)': { 
      display: 'block',
      alignItems: 'center',

    }
  },  
  boxCard:{
    width: '80%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  root: {
    width: 450,
    minHeight: 400,
    display: 'flex',
    position: 'relative' ,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    boxShadow: '0px 0px 30px black',
    opacity: .85,
    margin: 15,
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
    color: 'blue',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  rootChecks:{
    color: 'green',
  },
  rootCheckd:{
    color: 'red',
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
  acertos: {
      position: 'absolute',
      top: 20,
      left: 'calc(50% - 150/2)',
      background: 'white',
      color: 'black',
      width: 300,       
      textAlign: 'center',
      padding: 15,
      borderRadius: 5,
      opacity: .85,

      '@media (min-width: 601px) and (max-width:780px)': { 
        left: '30%',
  
      },

      '@media (min-width: 401px) and (max-width:600px)': { 
        width: 250,
        left: '20%',
      },

      '@media (max-width:400px)': { 
        width: 200,
        left: '22%',
      },

      '@media (max-width:350px)': { 
        width: 180,
        left: '22%',
      },
      
  },
  respostaCerta: {
    color: 'green',
  },
  respostaErrada: {
    color: 'red',
  },
  respostaNeutra: {
    color: 'black',
  },
  home:{
    position: 'absolute',
    top: 15,
    left: 15,
    color: 'white',
    cursor: 'pointer',
  }
});






const Questions = () => {
    const history = useHistory()
    const classes = useStyles();

    const QuestAnt = localStorage.getItem('QuestAnt')
    const QtdQuestAnt = localStorage.getItem('QtdQuestAnt')

    const respostas = JSON.parse(QuestAnt)
    const qtdAnterior = JSON.parse(QtdQuestAnt)
        
   
    const goHome = () => {
      history.push("/")
      window.location.reload()
    }    


    return(
      <Container maxWidth="false" className={classes.container} style={{backgroundImage: `url(${Background})` }}>
        <HomeIcon className={classes.home} onClick={goHome}/>
        <Typography className={classes.acertos} >
          You got {qtdAnterior} questions right
        </Typography>

        <Box className={classes.boxCard}>
            

            {respostas.map((atual) => 
            <Card className={classes.root}>          
                <CardContent>
                
                    
                    <Typography className={classes.pos} dangerouslySetInnerHTML={{ __html: `<b>Question:</b> ${atual.Pergunta}` }} />
                    
                    
                      <List>
                      
                        {atual.RespostaAleatoria.map((resposta) =>                           
                          
                          <ListItem>                                                      
                            <ListItemText className={
                              resposta === atual.Resposta && resposta === atual.RespostaCorreta ? classes.respostaCerta : 
                              resposta === atual.Resposta && resposta !== atual.RespostaCorreta ? classes.respostaErrada :
                              atual.RespostaCorreta !== atual.Resposta && resposta === atual.RespostaCorreta ? classes.respostaCerta :
                              classes.respostaNeutra} >
                              {(<span dangerouslySetInnerHTML={{ __html: resposta }} />)}
                            </ListItemText>
                          </ListItem>
                        )}   

                      </List>

                       
                </CardContent>       
            
            </Card>
        )}
            
        </Box>
      </Container>
    )
}

export default Questions