import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CreatePost() {

  return (
    <Paper elevation={2} padding={2}>
        <Box sx={{padding: 2}}>
            <TextField label="Whats on your Mind ?????" multiline fullWidth rows={3} placeholder="Type something...."/>
            <Box sx={{display:"flex", justifyContent: "flex-end", paddingTop: 2}}>
                <Button variant="contained">
                    Create Post
                </Button>
            </Box>
        </Box>
    </Paper>
  )
}

export default CreatePost