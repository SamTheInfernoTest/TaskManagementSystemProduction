import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import useWeb from "./WebContext";

const userContext = createContext();

export function UserContextProvider({ children }) {

    const [userType, setUserType] = useState(null)
    const [userName, setUserName] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [rememberMe, setRememberMe] = useState(true)

    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)

    const {baseApiUrl} = useWeb()

    useEffect(() => {
        if(Cookie.get('userName')){
            setUserName(Cookie.get('userName'))
            setUserType(Cookie.get('userType'))
            setRefreshToken(Cookie.get('refreshToken'))
        }
    }, [])

    function loginTheUser(userType ,username, refreshToken, token){
        setUserType(userType)
        setUserName(username)
        setToken(token)
        setRefreshToken(refreshToken)

        Cookie.set('userType', userType)
        Cookie.set('userName', username)
        Cookie.set('refreshToken', refreshToken)
    }

    function logoutTheUser(){
        Cookie.remove('userType')
        Cookie.remove('userName')
        Cookie.remove('refreshToken')

        setUserType(null)
        setUserName(null)
        setToken(null)
        setRefreshToken(null)
    }

    // useEffect(() => {
    //     axios.get('https://randomuser.me/api/')
    //     .then(response => response.data.results[0])
    //     .then(data => {
    //         setUserName(data.name.first + ' ' + data.name.last)
    //         setProfileImage(data.picture.medium)
    //     })
    // }, [])
    
    useEffect(() => {
        if(!rememberMe){
            window.addEventListener('beforeunload', logoutTheUser);
            return () => {
                window.removeEventListener('beforeunload', logoutTheUser);
            };
        }

    },[rememberMe])

    return (
        <userContext.Provider value={{ userName, setUserName, profileImage, setProfileImage, userType, setUserType, loginTheUser, logoutTheUser, rememberMe, setRememberMe }}>
            {children}
        </userContext.Provider>
    )
}

export default function useUser(){
    return useContext(userContext)
}