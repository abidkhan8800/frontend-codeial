import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin, register, editProfile, getFriends } from '../api';
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage} from '../utils';
import jwt from 'jwt-decode';

export const useAuth = () =>{
    return useContext(AuthContext)
}
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const getUser = async () => {
            setLoading(true)
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            if(userToken){
                const user = jwt(userToken);
                const reponse = await getFriends();
                let friends = [];
                if(reponse.success){
                    friends = reponse.data.friends
                }
                setUser({
                    ...user,
                    friends
                });
            }
    
            setLoading(false)
        }

        getUser();

    },[])
    
    const login = async (email, password) => {
        const response = await userLogin(email, password);
        console.log(response)
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null)
            return {
                success: true
            }
        }else{
            return{
                success: false,
                message: response.data
            }
        }
    }

    const editUser = async (id, name, password, confirm_Password) => {
        const response = await editProfile(id, name, password, confirm_Password);
        console.log(response)
        if(response.success){
            setUser(response.data.user);
            // setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null)
            return {
                success: true
            }
        }else{
            return{
                success: false,
                message: response.message
            }
        }
    }

    const signup = async (name, email, password) => {
        const response = await register(name, email, password);
        if(response.success){
            // setUser(response.data.user);
            // setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null)
            return {
                success: true
            }
        }else{
            return{
                success: false,
                message: response.message
            }
        }
    }

    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    const updateUserFriends = async (addFriend, friend) => {
        console.log("jhgjgfjagjhfgajfhgajfgajhgfajhg jgjhagjagdjhagdjh",addFriend, friend)
        if(addFriend){
            setUser({
                ...user,
                friends: [...user.friends, friend]
            })
            return;
        }


            let newFriends = user.friends.filter((f) => f.to_user._id !== friend.to_user._id);
            console.log(newFriends)
            setUser({
                ...user,
                friends: [...newFriends]
            })
            return
    }

    return {
        user,
        login,
        logout,
        loading,
        signup,
        editUser,
        updateUserFriends
    }
}