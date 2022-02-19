import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function CreateComment() {

  return (
    <Grid container spacing={3} alignItems="flex-end">
        <Grid item sm={6}>
            <TextField label="Add Comment" size="small" multiline fullWidth  rows={1} placeholder="Type something...."/>
        </Grid>
        <Grid item sm={4} justifyContent="flex-end">
            <Button variant="contained">
                Add comment
            </Button>
        </Grid>
    </Grid>
  )
}

export default CreateComment