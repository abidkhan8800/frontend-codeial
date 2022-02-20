import React from 'react';
import { useState, useEffect } from 'react';
import { getPosts } from  '../api';
import { Post } from '../components';
import { CreatePost, Loader } from '../components';
import { useAuth } from '../hooks'

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";



function Home() {
    const [posts, setPosts] = useState([]);
    const auth = useAuth();
    useEffect(()=>{
        const fetchPost = async () => {
            const response = await getPosts();
            console.log(response)
            setPosts(response.data.posts);
        }

        fetchPost();
    },[])

    if(auth.loading){
        return <Loader/>
    }
    return (
        <Grid container spacing={1} marginTop={8}>
            <Grid item sm={8}>
               {auth.user &&  <CreatePost />}
                <Post posts={posts}/>
            </Grid>
            <Grid item sm={4}>
                <Paper>
                    <Box>
                        <h1>Friend List</h1>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Home