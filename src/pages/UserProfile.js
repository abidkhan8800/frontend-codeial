import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from '../hooks';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom';

function UserProfile() {
    const auth = useAuth();
    const location = useLocation();
    console.log(location);
    const { user ={ }} = location.state;
 
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
                    <Typography variant="h6" component="p" >
                        {user? user.email : "User Email"}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body1" component="p" >
                        Name
                    </Typography>
                    <Typography variant="h6" component="p" >
                        {user? user.name : "User Name"}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                        <Box mt={2} mb={5}> 
                            <Button variant="contained">
                                Add Friend
                            </Button>
                        </Box> 
                        <Box mt={2} mb={5}> 
                            <Button variant="contained">
                                Remove Friend
                            </Button>
                        </Box> 

                </Grid>
            </Grid>
        </Paper>
    )
}

export default UserProfile;