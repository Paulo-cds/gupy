import {useEffect, useState} from 'react'
import axios from 'axios'

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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
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
});






const Questions = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [data,setData] = useState([])        
    

    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=1')
        .then(response => {
          setData(response.data.results)

          console.log(`Data = ${data}`)
        })
               
    }, [])

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

    

    return(
        <Card className={classes.root}>          
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom >
                    {/* {(data.results.category)} */}
                </Typography>
                <Typography variant="h5" component="h2">
                  Dificuldade: {/* {(data.results.difficulty)}  */}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Pergunta: {/* {(data.results.question)} */}
                </Typography>
                
                <FormControl component="fieldset">
                  <FormLabel component="legend">Resposta</FormLabel>
                  <RadioGroup aria-label="gender" name="customized-radios">
                    <FormControlLabel 
                      value='1' /* {(data.results.incorrect_answers[0])}  */
                      control={<StyledRadio />} 
                      label='1' /* {(data.results.incorrect_answers[0])}  */
                    />

                    <FormControlLabel 
                      value= '1'/* {(data.results.incorrect_answers[1])}  */
                      control={<StyledRadio />} 
                      label='1' /* {(data.results.incorrect_answers[1])}  */
                    />

                    <FormControlLabel 
                      value='1' /* {(data.results.incorrect_answers[2])} */ 
                      control={<StyledRadio />} 
                      label='1' /* {(data.results.incorrect_answers[2])}  */
                    />                    

                  </RadioGroup>
                </FormControl>
            </CardContent>            
        </Card>
    )
}

export default Questions