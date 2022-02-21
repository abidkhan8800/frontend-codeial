import React,{ useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import  Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { makeStyles} from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks'

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

function Signup() {
    const auth = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const {addToast} = useToasts();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);

  const handleSubmit = async (e) => {
    setSigningUp(true)
      console.log("hii");
      e.preventDefault();
      if( confirmPassword !== password ) {
          return addToast('Password and confirm password should be same')
      }

      const response = await auth.signup(name, email, password);
      if(response.success) {
        setSigningUp(false)
            addToast('User signed up successfully',{
                appearance: 'success'
            })
            navigate('/login')

        }else{
            addToast(response.data,{
                appearance: 'error'
            })
        }


  }

  return (
   <Paper elevation={3}>
    <Typography variant="h5" component="h1" align="center" p={1}>
       Registration Form
    </Typography>
    <Box component="form" textAlign="center" onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <TextField 
                    label="Name" 
                    required 
                    placeholder="Enter Name"  
                    type="text" size="small" 
                    className={classes.formField} 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)}
                />
           </Box>
           <Box className={classes.fieldContainer}>
                <TextField 
                    label="Email" 
                    required 
                    placeholder="Enter Email"  
                    type="email" 
                    size="small" 
                    className={classes.formField} 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
           </Box>
           <Box  className={classes.fieldContainer}>
                <TextField 
                    label="Password"  
                    required 
                    placeholder="Enter Password" 
                    size="small" 
                    type="password" 
                    className={classes.formField} 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
           </Box>
           <Box  className={classes.fieldContainer}>
                <TextField 
                    label="Confirm Password" 
                    required placeholder="Enter Confirm Password" 
                    size="small" 
                    type="password" 
                    className={classes.formField}
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                />
           </Box>
            <Box  className={classes.fieldContainer}>
                <Button type="submit" variant="contained" disabled={signingUp}>
                    { signingUp ? "Registering User": "Register" }
                </Button>
            </Box>
       </Box>
   </Paper>
  )
}

export default Signup