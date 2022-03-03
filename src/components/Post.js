import React, { useState } from 'react';
import { Accordian } from './';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {CreateComment} from './';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import { toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications'


function Post({post}) {
    const { addToast } = useToasts();
    const [postLikes, setPostLikes] = useState(post.likes.length);
    const auth = useAuth();
    const handleTogglePost = async (postId) =>{
        const response = await toggleLike(postId, "Post");
        if(response.success){
            if(!response.data.deleted){
                addToast('Like Added Successfully',{
                    appearance: 'success'
                });
                setPostLikes(postLikes+1)
            }else{
                addToast('Like Removed successfully',{
                    appearance: 'success'
                });
                setPostLikes(postLikes-1)
            }
        }else{
            addToast(response.message,{
                appearance: 'error'
            })
        }
    }
    return (
        <Paper>
            <Box margin={2} sx={{ display: "flex", alignItems: "center"}}>
                <AccountCircleIcon color="primary" fontSize="large"/>
                {/* <img  src=""/> */}
                <Typography variant="subtitle1" component="h1" ml={2}>
                <Link to={`/user/${post.user._id}`} state={{user: post.user}}> {post.user.name}</Link> 
                </Typography>
            </Box>
            <Box margin={2}>
                <Typography variant="h6" component="p" ml={2}>
                    {post.content}
                </Typography>
            </Box>
            <Box margin={2}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2}}>
                    <FavoriteBorderIcon fontSize="small" color="primary" sx={{ marginRight: 0.5 }} onClick={()=>{handleTogglePost(post._id)}}/>
                    {/* <FavoriteIcon   sx={{ marginRight: 2, color: 'red' }} /> */}
                    <Typography variant="subtitle2" component="p">
                        {postLikes} Likes
                    </Typography>
                    <ChatBubbleOutlineIcon fontSize="small" color="primary" sx={{ marginLeft: 2, marginRight: 0.5 }} onClick={()=>{console.log("Hihihih")}}/>
                    {/* <FavoriteIcon   sx={{ marginRight: 2, color: 'red' }} /> */}
                    <Typography variant="subtitle2" component="p">
                    {post.comments.length} Comments
                    </Typography>
                </Box>
            { auth.user && <CreateComment post_id={post._id} />}
                <Accordian  comments={post.comments} margin={2}/>
            </Box>
        </Paper>
    )
    }

Post.propTypes = {
    post: PropTypes.object.isRequired,
}

export default Post