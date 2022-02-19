import React from 'react';
import { useState, useEffect } from 'react';
import { getPosts } from  '../api';
import { Post } from '../components';
import { CreatePost } from '../components';

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPost = async () => {
            const response = await getPosts();
            console.log(response)
            setPosts(response.data.posts)
        }

        fetchPost();
    },[])

    return (
        <Grid container spacing={1} marginTop={8}>
            <Grid item sm={8}>
                <CreatePost />
                <Post posts={posts}/>
            </Grid>
            <Grid item sm={4}>
                <Paper>
                    <Box sx={{paddingY: 2}}>
                        {posts.map((post, postIndex)=>(
                            <Box key={postIndex} margin={2} sx={{ display: "flex", alignItems: "center"}}>
                                <AccountCircleIcon color="primary" fontSize="large"/>
                                {/* <img  src=""/> */}
                                <Typography variant="p" component="h1" ml={2}>
                                    {post.content}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Home