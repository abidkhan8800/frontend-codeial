import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import  Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme)=>({
    LoginInputContianer:{
        display: 'flex',
        flexDirection: 'column',
    },
    fieldContainer:{
        padding: '10px',
    },
    formField:{
        width: "40%"
    }
}))

function Login() {
  const classes = useStyles();
  return (
   <Paper elevation={3}>
    <Typography variant="h5" component="h1" align="center" p={1}>
       Registration Form
    </Typography>
    <Box textAlign="center">
           <Box className={classes.fieldContainer}>
                <TextField label="Email" placeholder="Enter Email" size="small" className={classes.formField}/>
           </Box>
           <Box  className={classes.fieldContainer}>
                <TextField label="Password" placeholder="Enter Password" size="small" type="password" className={classes.formField}/>
           </Box>
           <Box  className={classes.fieldContainer}>
                <TextField label="Confirm Password" placeholder="Enter Confirm Password" size="small" type="password" className={classes.formField}/>
           </Box>
            <Box  className={classes.fieldContainer}>
                <Button variant="contained">
                    Register
                </Button>
            </Box>
       </Box>
   </Paper>
  )
}

export default Login