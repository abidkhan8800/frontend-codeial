import React,{ useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import  Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { makeStyles} from '@mui/styles';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { useNavigate, Navigate } from 'react-router-dom';


const useStyles = makeStyles((theme)=>({
    LoginInputContianer:{
        display: 'flex',
        flexDirection: 'column',
    },
    fieldContainer:{
        padding: '10px',
    },
    formField:{
        width: "40%",
    }
}))

function Login() {
    const classes = useStyles();
    const navigate = useNavigate();
    const {addToast} = useToasts();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const auth = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoggingIn(true);

        if(!email || !password) {
            console.log("hi")
            
            addToast('Please enter both email and password.',{
                appearance: 'error'
            })
         setLoggingIn(false);   
            return;
        }

        const response = await auth.login(email, password);
        console.log("login reponse",response)
        if(response.success) {
            addToast('Logged in successfully',{
                appearance: 'success'
            })
            navigate('/')

        }else{
            addToast(response.message,{
                appearance: 'error'
            })
        }
        setLoggingIn(false);
    }
    if(auth.user){
        return <Navigate to="/"/>
    }
    return (
    <Paper elevation={3}>
        <Typography variant="h5" component="h1" align="center" p={1}>
            Login Form
        </Typography>
        <Box component="form" textAlign="center" onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
                <TextField 
                    label="Email" 
                    placeholder="Enter Email" 
                    size="small" 
                    type="email"
                    className={classes.formField}
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </Box>
            <Box  className={classes.fieldContainer}>
                <TextField 
                    label="Password" 
                    placeholder="Enter Password" 
                    size="small" 
                    type="password" 
                    className={classes.formField} 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </Box>
                <Box  className={classes.fieldContainer}>
                    <Button type="submit" variant="contained" disabled={loggingIn} sx={{ fontSize:15}}>
                      { loggingIn ? 'Logging in... ': 'Log In'}
                    </Button>
                </Box>
        </Box>
    </Paper>
    )
}

export default Login