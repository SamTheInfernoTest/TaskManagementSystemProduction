import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import useWeb from "./WebContext";

const userContext = createContext();

export function UserContextProvider({ children }) {

    const [userType, setUserType] = useState(null)
    const [uid, setUid] = useState(null)
    const [name, setName] = useState('')
    const [standards, setStandards] = useState([])
    const [profileImage, setProfileImage] = useState(null)
    const [rememberMe, setRememberMe] = useState(true)

    const [token, setToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)

    const {baseApiUrl, theme} = useWeb()

    useEffect(() => {
        if(Cookie.get('uid')){
            setUid(Cookie.get('uid'))
            setUserType(Cookie.get('userType'))
            setRefreshToken(Cookie.get('refreshToken'))
            setName(Cookie.get('name'))
            setProfileImage(Cookie.get('profileImage'))
            setStandards(JSON.parse(Cookie.get('standards') || '[]'))
        }
    }, [])

    function loginTheUser(userType , uid, name, profileImage, standards, refreshToken, token){
        console.log(token);
        setUserType(userType)
        setUid(uid)
        setName(name)
        setProfileImage(profileImage)
        setStandards(standards)
        setToken(token)
        setRefreshToken(refreshToken)

        Cookie.set('userType', userType)
        Cookie.set('uid', uid)
        Cookie.set('name', name)
        Cookie.set('profileImage', profileImage)
        Cookie.set('standards', JSON.stringify(standards))
        Cookie.set('refreshToken', refreshToken)
    }

    function logoutTheUser(){
        Cookie.remove('userType')
        Cookie.remove('uid')
        Cookie.remove('name')
        Cookie.remove('profileImage')
        Cookie.remove('standards')
        Cookie.remove('refreshToken')

        setUserType(null)
        setUid(null)
        setName('')
        setProfileImage(null)
        setStandards([])
        setToken(null)
        setRefreshToken(null)

        // localStorage.clear();
        // localStorage.setItem('userSelection', userType)
        // localStorage.setItem('theme', theme);
    }

    // useEffect(() => {
    //     axios.get('https://randomuser.me/api/')
    //     .then(response => response.data.results[0])
    //     .then(data => {
    //         setUid(data.name.first + ' ' + data.name.last)
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

    //// Custom Axios
    
    // Define your base URLs and endpoints
    const API_BASE_URL = baseApiUrl;
    const REFRESH_TOKEN_URL = `${API_BASE_URL}/${userType}/refresh/`;

    // Axios instance
    const axiosSecure = axios.create({
        baseURL: API_BASE_URL,
    });

    // Function to set the authorization header for each request
    const setAuthHeader = (token) => {
        axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    // Axios interceptor for request
    axiosSecure.interceptors.request.use(
        (config) => {
            // Add token to headers if available
            const access = token
            if (access) {
                config.headers['Authorization'] = `Bearer ${access}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Function to handle refreshing the token
    const refreshAccessToken = async () => {
        console.log('refreshing token');
        
        const refresh = refreshToken
        try {
            const response = await axios.post(REFRESH_TOKEN_URL, { refresh });
            const newAccessToken = response.data.access;

            // Save the new token in local storage or state
            
            setToken(newAccessToken);

            // Update Axios authorization header with new token
            setAuthHeader(newAccessToken);
            return newAccessToken;
        } catch (error) {
            // Handle the error (e.g., logout user)
            console.error('Token refresh failed', error);
            throw error;
        }
    };

    // Response interceptor to handle token expiry
    axiosSecure.interceptors.response.use(
        (response) => response, // Pass through successful responses
        async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newToken = await refreshAccessToken();
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    console.log(newToken);
                    
                    return axiosSecure(originalRequest); // Retry the request with the new token
                } catch (refreshError) {
                    return Promise.reject(refreshError); // Pass on refresh error
                }
            }
            return Promise.reject(error); // Pass on other errors
        }
    );

    //// Custom Axios

    return (
        <userContext.Provider value={{ uid, name, profileImage, standards, userType, loginTheUser, logoutTheUser, rememberMe, setRememberMe, axiosSecure }}>
            {children}
        </userContext.Provider>
    )
}

export default function useUser(){
    return useContext(userContext)
}