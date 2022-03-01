import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Loader } from '../components'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useParams, useNavigate} from 'react-router-dom';
import {userInfo, addFriend, removeFriend} from '../api';
import { useToasts } from 'react-toast-notifications';
import { useAuth} from "../hooks"

function UserProfile() {
    const { addToast } = useToasts();
    const { userId } = useParams();
    const [user, setUser] = useState({})
    const [requsetInProgress, setRequestInProgress] = useState(false)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const auth = useAuth();

    console.log(auth.user)
    useEffect(()=>{
        const fetchData = async () => {
            const fetchUser = await userInfo(userId);
            if(fetchUser.success){
                setUser(fetchUser.data.user);
               
            }else{
                addToast(fetchUser.message, {
                    appearance: 'error'
                })
                setLoading(false)
                return navigate('/')
            }

            setLoading(false)
        }
        fetchData();
    }, [userId, addToast, navigate]);

    const checkIfUserFriend = ()=>{
        const friendIds = (auth.user.friends && auth.user.friends).map((friend) =>  (friend.to_user._id && friend.to_user._id));
        const index = friendIds.indexOf(userId);
        if (index !== -1) {
            return true;
        }
      
          return false;
    }

    let isFriend = checkIfUserFriend();

    const handleAddFriendClick = async (e) =>{
        setLoading(true);
        setRequestInProgress(true);
        console.log("requsetInProgress",requsetInProgress)

        const response = await addFriend(userId);
        console.log(response)
        if(response.success){
            const {friendship} = response.data;
            console.log("friendShip",friendship)
            auth.updateUserFriends(true, friendship);
            setLoading(false)
            setRequestInProgress(false);
            addToast('Friend added successfully',{
                appearance: 'success'
            })
        }else{
            addToast(response.message,{
                appearance: 'error'
            })
        }
        setRequestInProgress(false);
        setLoading(false);
    }
    const handleRemoveFriendClick = async (e) =>{
        setRequestInProgress(true);
    
        const response = await removeFriend(userId);
        console.log(response)
        if(response.success){
            const friendShip = auth.user.friends.filter(friend => friend.to_user._id === userId);
            auth.updateUserFriends(false, friendShip[0]);
            setRequestInProgress(false);
           
            addToast('Friend removed successfully',{
                appearance: 'success'
            })
        }else{
            addToast(response.message,{
                appearance: 'error'
            })
        }
        
        setRequestInProgress(false);
    }

    // if(loading){
    //     return <Loader />
    // }
 
    return (
        <Paper>
           {!loading ? 
             <Grid  component="form" container spacing={0.5} justifyContent="center" sx={{margin: 5}}>
             <Grid item xs={8} align="center">
                 <img width={120} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt=""/>
             </Grid>
             <Grid item xs={8}>
                 <Typography variant="body1" component="p">
                     Email
                 </Typography>
                 <Typography variant="h6" component="p" >
                     {user? user.email : "User Email"}
                 </Typography>
             </Grid>
             <Grid item xs={8}>
                 <Typography variant="body1" component="p" >
                     Name
                 </Typography>
                 <Typography variant="h6" component="p" >
                     {user? user.name : "User Name"}
                 </Typography>
             </Grid>
             <Grid item xs={8}>
                 <Box mt={2} mb={5}> 
                 { isFriend ?
                     <Button variant="contained" onClick={handleRemoveFriendClick} disabled={requsetInProgress}>
                          Remove Friend
                     </Button> :
                     <Button variant="contained" onClick={handleAddFriendClick} disabled={requsetInProgress}>
                         Add Friend 
                     </Button>
                 }
                 </Box>      
             </Grid>
         </Grid>: <Loader />
           }
        </Paper>
    )
}

export default UserProfile;