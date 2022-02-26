import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin, register, editProfile } from '../api';
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage} from '../utils';
import jwt from 'jwt-decode';

export const useAuth = () =>{
    return useContext(AuthContext)
}
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if(userToken){
            const user = jwt(userToken);

            setUser(user)
        }

        setLoading(false)
    },[])

    const login = async (email, password) => {
        const response = await userLogin(email, password);
        console.log("api login response",response.data)
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

    return {
        user,
        login,
        logout,
        loading,
        signup,
        editUser
    }
}