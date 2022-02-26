import {API_URLS, LOCALSTORAGE_TOKEN_KEY} from "../utils";
import { getFormBody } from "../utils";


const customFetch = async (url, {body, ...customConfig}) => {

    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
    }

    if(token){
        headers.Authorization = `Bearer ${token}`
    }

    const config = {
        ...customConfig,
        headers:{
            ...headers,
            ...customConfig.headers
        }

    }

    if(body){
        config.body = getFormBody(body);
    }

    try{
        const response = await fetch(url, config);
        const data = await response.json();

        if(data.success){
            return {
                data: data.data,
                success: true
            };
        }

        throw new Error(data.message);
    }catch(error){
        console.error('error', error.message)
        return {
            data: error.message,
            success: false
        };
    }

}

export const getPosts = (page=1, limit=5) => {
    return customFetch(API_URLS.posts(page, limit),{
        method: 'GET'
    });
}

export const  login = (email, password) => {
    return customFetch(API_URLS.login(),{
        method: 'POST',
        body: {email, password}
    })
}

export const register = (name, email, password) => {
    console.log("inside the signup")
    console.log(API_URLS.signup())
    return customFetch(API_URLS.signup(),{
        method: 'POST',
        body: {name, email, password, confirm_password: password}
    })
}

export const editProfile = (id, name, password, confirm_password) => {
    return customFetch(API_URLS.editUser(),{
        method: 'POST',
        body: {id, name, password, confirm_password: confirm_password}
    })
}