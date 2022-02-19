import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function CreateComment() {

  return (
    <Box marginY={1} sx={{marginBottom: 2}}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item sm={9}>
            <TextField label="Add Comment" size="small" multiline fullWidth  rows={1} placeholder="Type something...."/>
        </Grid>
        <Grid item sm={3} container justifyContent="flex-end">
            <Button variant="contained" margin={2}>
                Add comment
            </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateComment