import React,{ useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { addComment } from  '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks'

function CreateComment(props) {
  const {addToast} = useToasts();
  const posts = usePosts();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false)
  const hanldeEnterPress = async (e) => {
    if(e.keyCode === 13){
      setAddingComment(true)
      e.preventDefault();
      if(comment.length === 0){
        addToast('Comment cannot be blank',{
          appearance: 'error'
        })
        setAddingComment(false)
        return;
      }
      const response = await addComment(props.post_id, comment);
      if(response.success){
        setComment('')
        posts.addCommentToState(response.data.comment)
        addToast('Comment Added Successfully',{
          appearance: 'success'
        })
      }else{
        addToast(response.message,{
          appearance: 'error'
        })
      }
      setAddingComment(false)
    }
  }
  return (
    <Box marginY={1} sx={{marginBottom: 2}}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item sm={12}>
            <TextField label={!addingComment ? "Add Comment": "Adding Comment..."} size="small" multiline fullWidth  rows={1} placeholder="Type something...." value={comment}onChange={(e)=>setComment(e.target.value)} onKeyDown={hanldeEnterPress} disabled={addingComment}/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateComment