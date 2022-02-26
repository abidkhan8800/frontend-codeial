import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from '../hooks';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useToasts} from 'react-toast-notifications';

function Settings() {
    const auth = useAuth();
    console.log(auth)
    const {addToast} = useToasts();
    const [editProfile, setEditProfile] = useState(false);
    const [name, setName] = useState(auth.user.name ? auth.user.name: '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);

    
    const clearForm = () => {
        setPassword('');
        setConfirmPassword('');
        setSavingProfile(false);
    }

    const handleSubmit = async () => {
        console.log('hihih')
        setSavingProfile(true)
        let error = false;
        if(!name || !password || !confirmPassword){
            setSavingProfile(false)
            return addToast('Either name, password or confirm password is missing',{
                appearance: 'error'
            })
        }

        if(password !== confirmPassword){
            setSavingProfile(false)
            return addToast('Password and confirm password does not match',{
                appearance: 'error'
            })
        }

        const response = await auth.editUser(auth.user._id, name, password, confirmPassword);

        if(response.success){
            addToast('User Updated Successfully',{
                appearance: 'success'
            })
            clearForm();
        }

    }
    return (
        <Paper>
            <Grid  component="form" container spacing={0.5} justifyContent="center" sx={{margin: 5}}>
                <Grid item xs={8} align="center">
                    <img width={120} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt=""/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" component="p">
                        Email
                    </Typography>
                    <TextField
                        value={auth.user.email}
                        size="small"
                        type="text"
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" component="p" >
                        Name
                    </Typography>
                    <TextField
                        value={name}
                        size="small"
                        type="text"
                        fullWidth
                        disabled={!editProfile}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                </Grid>
                {editProfile ? <>
                    <Grid item xs={8}>
                    <Typography variant="body1" component="p" >
                        Password
                    </Typography>
                    <TextField
                        value={password}
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e)=>{setPassword(e.target.value)}}
                       
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" component="p" >
                        Confirm Password
                    </Typography>
                    <TextField
                         value={confirmPassword}
                        size="small"
                        type="password"
                        fullWidth
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    />
                </Grid>
                </>:<></>}
                <Grid item xs={8}>
                   { !editProfile ?  
                        <Box mt={2} mb={5}> 
                            <Button variant="contained" onClick={()=>{setEditProfile(!editProfile)}}>
                                Edit Profile
                            </Button>
                        </Box> : 
                        <Box mt={2} mb={5}> 
                            <Button variant="contained" width="large" disabled={savingProfile} onClick={handleSubmit}>
                                {savingProfile ? "Saving Profile" : "Save Profile"}
                            </Button>
                            <Button variant="contained" color="secondary" sx={{marginLeft: 2}} onClick={()=>{setEditProfile(!editProfile)}} disabled={savingProfile}>
                                Go Back
                            </Button>
                        </Box>
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Settings