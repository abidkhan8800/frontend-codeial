import React from 'react';
import { useState, useEffect } from 'react';
import { getPosts, getFriends } from  '../api';
import { Post } from '../components';
import { CreatePost, Loader, FriendsList } from '../components';
import { useAuth } from '../hooks'

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";



function Home() {
    const [posts, setPosts] = useState([]);
    const auth = useAuth();
    const [loading, setLoading] = useState(true)
    useEffect(()=>{

        const fetchData = async () => {
            const response = await getPosts();
            setPosts(response.data.posts);
            setLoading(false)
        }

        fetchData();
    },[])

    if(loading){
        return <Loader/>
    }
    return (
        <Grid container spacing={2} marginTop={8}>
            <Grid item sm={8}>
               {auth.user &&  <CreatePost />}
                <Post posts={posts}/>
            </Grid>
            <Grid item sm={4}>
                <Paper>
                    <Box>
                        <FriendsList />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Home