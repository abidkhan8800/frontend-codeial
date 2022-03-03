import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    friendListContainerStyles:{
        paddingLeft: 4,
        paddingTop: 3,
        paddingBottom: 3,
        '& h1':{
            borderBottom: '1px solid #ccc',
            marginBottom: 6
        }

    },
    userLinkStyles: {
        textDecoration: 'none',
        display: "flex",
        alignItems: "center",
        color: "black",
        marginTop: 2,
        '& img':{
            marginRight: 8,
            width: 30,
        }
    }
})

export default function FriendsList() {
    const classes = useStyles();
    const auth = useAuth();
    const {friends = []} = auth.user;
  return (
    <Box className={classes.friendListContainerStyles}>
        <Typography variant="h4" component="h1">Friends</Typography>
        {!friends && <Typography variant="h6" component="h2"> No Friends Found!</Typography>}
        {friends && friends.map((friend)=>(
            <Link className={classes.userLinkStyles} to={`/user/${friend.to_user._id}`} key={`friend-${friend.to_user._id}`}>
                <img alt="" src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"></img>
                <Typography variant="subtitle1" component="p">{friend.to_user.email}</Typography>
            </Link>
        ))}
    </Box>
  )
}
