import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme)=>({
    lightGrey: {
        backgroundColor: "lightgrey",
    }
}))

function Comment() {
  const classes = useStyles();
  return (
    <Box>
        <Box sx={{display: 'flex'}}>
            <AccountCircleIcon color="primary" fontSize="small"/>
            <Paper elevation={3} className={classes.lightGrey} sx={{marginLeft: 1}}>          
                <Box padding={1}>
                    <Typography variant="" component="h5" color="primary">
                        User Name
                    </Typography>
                    <Typography variant="" component="h5">
                       Comment Content
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}} padding={1}> 
                <FavoriteBorderOutlined sx={{fontSize: 14, marginRight: 1}}/>
                <Typography component="span" sx={{fontSize: 12}}>
                       LIKE
                    </Typography>
                </Box>
            </Paper>
        </Box>
    </Box>
  )
}

export default Comment