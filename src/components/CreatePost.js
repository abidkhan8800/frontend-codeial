import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useToasts } from 'react-toast-notifications';
import { addPost } from '../api';
import { usePosts } from '../hooks';


function CreatePost() {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts = usePosts();

  const handleAddPost = async () => {
    setAddingPost(true);
    if(post.length === 0){
      addToast('Post can not be blank!',{
        appearance: 'error'
      })
      return;
    }
    const response = await addPost(post);
    if(response.success){
      setPost('');
      posts.addPostToState(response.data.post)
      addToast('Post created successfully',{
        appearance: 'success'
      })
    }else{
      addToast(response.message,{
        appearance: 'error'
      })
    }

    setAddingPost(false);
  }
  return (
   <Paper>
      <Box sx={{padding: 2}}>
        <TextField label="Whats on your Mind ?????" multiline fullWidth rows={3} placeholder="Type something...." onChange={(e)=> setPost(e.target.value)} value={post}/>
        <Box sx={{display:"flex", justifyContent: "flex-end", paddingTop: 2}}>
            <Button variant="contained" onClick={handleAddPost} disabled={addingPost}>
                Create Post
            </Button>
        </Box>
    </Box>
   </Paper>
  )
}

export default CreatePost