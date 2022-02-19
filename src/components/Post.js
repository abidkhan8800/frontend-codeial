import React from 'react';
import { Accordian } from './';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {CreateComment} from './';


function Post({posts}) {
  return (
    <>
    {posts.map((post, postIndex)=>(
        <Paper  key={postIndex}>
            <Box margin={2} sx={{ display: "flex", alignItems: "center"}}>
                <AccountCircleIcon color="primary" fontSize="large"/>
                {/* <img  src=""/> */}
                <Typography variant="subtitle1" component="h1" ml={2}>
                    {post.user.name}
                </Typography>
            </Box>
            <Box margin={2}>
                <Typography variant="h6" component="p" ml={2}>
                    {post.content}
                </Typography>
            </Box>
            <Box margin={2}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2}}>
                    <FavoriteBorderIcon fontSize="small" color="primary" sx={{ marginRight: 0.5 }} onClick={()=>{console.log("Hihihih")}}/>
                    {/* <FavoriteIcon   sx={{ marginRight: 2, color: 'red' }} /> */}
                    <Typography variant="subtitle2" component="p">
                        10 Likes
                    </Typography>
                    <ChatBubbleOutlineIcon fontSize="small" color="primary" sx={{ marginLeft: 2, marginRight: 0.5 }} onClick={()=>{console.log("Hihihih")}}/>
                    {/* <FavoriteIcon   sx={{ marginRight: 2, color: 'red' }} /> */}
                    <Typography variant="subtitle2" component="p">
                        10 Comments
                    </Typography>
                </Box>
                <CreateComment />
                <Accordian margin={2}/>
            </Box>
        </Paper>
    ))}
    </>
  )
}

export default Post