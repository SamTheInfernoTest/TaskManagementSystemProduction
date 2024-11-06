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
            const token = Cookie.get('token'); // Or from your app's state
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Function to handle refreshing the token
    const refreshAccessToken = async () => {
        const refreshToken = Cookie.get('refreshToken'); // Or retrieve from state if managed
        try {
            const response = await axios.post(REFRESH_TOKEN_URL, { refreshToken });
            const newAccessToken = response.data.access;

            // Save the new token in local storage or state
            Cookie.set('token', newAccessToken);
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
        <userContext.Provider value={{ userName, setUserName, profileImage, setProfileImage, userType, setUserType, loginTheUser, logoutTheUser, rememberMe, setRememberMe, axiosSecure }}>
            {children}
        </userContext.Provider>
    )
}

export default function useUser(){
    return useContext(userContext)
}