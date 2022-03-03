import React from 'react';
import { Post } from '../components';
import { CreatePost, Loader, FriendsList } from '../components';
import { useAuth, usePosts } from '../hooks'

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";



function Home() {
    const auth = useAuth();
    const posts = usePosts();
    if(posts.loading){
        return <Loader/>
    }
    return (
        <Grid container spacing={2} marginTop={8}>
            <Grid item sm={8}>
               {auth.user &&  <CreatePost />}
                { posts.data.map((post)=>(
                    <Post post={post} key={`post-${post._id}`}/>
                ))}
            </Grid>
            <Grid item sm={4}>
                <Paper>
                    <Box>
                    {auth.user &&  <FriendsList />}  
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Home