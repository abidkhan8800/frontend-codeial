import React,{ useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { useToasts } from 'react-toast-notifications';
import { toggleLike } from '../api';

const useStyles = makeStyles((theme)=>({
    lightGrey: {
        backgroundColor: "lightgrey !important",
    }
}))

function Comment({comment}) {
  const classes = useStyles();
  const { addToast } = useToasts();
    const [commentLikes, setCommentLikes] = useState(comment.likes.length);
    const handleToggleCommentLike = async () =>{
        const response = await toggleLike(comment._id, "Comment");
        if(response.success){
            if(!response.data.deleted){
                addToast('Like Added Successfully',{
                    appearance: 'success'
                });
                setCommentLikes(commentLikes+1)
            }else{
                addToast('Like Removed successfully',{
                    appearance: 'success'
                });
                setCommentLikes(commentLikes-1)
            }
        }else{
            addToast(response.message,{
                appearance: 'error'
            })
        }
    }
  return ( 
    <Box sx={{display: 'flex', marginBottom: 2}} key={`comment-${comment._id}`}>
        <AccountCircleIcon color="primary" fontSize="small"/>
        <Paper elevation={3} className={classes.lightGrey}>          
            <Box padding={1}>
                <Typography variant="" component="h5" color="primary">
                    {comment.user.name}
                </Typography>
                <Typography variant="" component="h5">
                    {comment.content}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}} padding={1}> 
            <FavoriteBorderOutlined sx={{fontSize: 14, marginRight: 1}} onClick={handleToggleCommentLike}/>
            <Typography component="span" sx={{fontSize: 12}}>
                {commentLikes}   likes
                </Typography>
            </Box>
        </Paper>
     </Box>
  )
}

export default Comment;