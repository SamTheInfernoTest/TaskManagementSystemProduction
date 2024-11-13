import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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

    const [timeLimit, setTimeLimit] = useState(172800000)

    const {baseApiUrl, theme} = useWeb()

    useEffect(() => {
        if (sessionStorage.getItem('uid')){
            setUid(sessionStorage.getItem('uid'))
            setUserType(sessionStorage.getItem('userType'))
            setRefreshToken(sessionStorage.getItem('refreshToken'))
            setName(sessionStorage.getItem('name'))
            setProfileImage(sessionStorage.getItem('profileImage'))
            setStandards(JSON.parse(sessionStorage.getItem('standards') || '[]'))
        }
    }, [])

    function loginTheUser(userType , uid, name, profileImage, standards, refreshToken, token){
        setUserType(userType)
        setUid(uid)
        setName(name)
        setProfileImage(profileImage)
        setStandards(standards)
        setToken(token)
        setRefreshToken(refreshToken)

        sessionStorage.setItem('userType', userType)
        sessionStorage.setItem('uid', uid)
        sessionStorage.setItem('name', name)
        sessionStorage.setItem('profileImage', profileImage)
        sessionStorage.setItem('standards', JSON.stringify(standards))
        sessionStorage.setItem('refreshToken', refreshToken)
    }

    function logoutTheUser(){
        sessionStorage.removeItem('userType')
        sessionStorage.removeItem('uid')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('profileImage')
        sessionStorage.removeItem('standards')
        sessionStorage.removeItem('refreshToken')

        setUserType(null)
        setUid(null)
        setName('')
        setProfileImage(null)
        setStandards([])
        setToken(null)
        setRefreshToken(null)

        sessionStorage.clear();
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
            
            logoutTheUser()
            
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

                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`

                    const response = await axios(originalRequest)
                    console.info('Token refreshed successfully')
                    return response // Retry the request with the new token
                } catch (refreshError) {
                    return Promise.reject(refreshError); // Pass on refresh error
                }
            }
            return Promise.reject(error); // Pass on other errors
        }
    );

    //// Custom Axios

    function isoToLocal(isoString) {
        if (isoString == null) return ''
        // Parse the ISO 8601 date-time string and convert it to local time
        const date = new Date(isoString);

        // Convert to local time string with Indian locale and time zone (Asia/Kolkata)
        const localTimeString = date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata', // Set the time zone to India
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        // Split the local time string to format it as needed
        const [datePart, timePart] = localTimeString.split(', ');
        const [day, month, year] = datePart.split('/');
        const [time, period] = timePart.split(' ');
        const [hour, minute, second] = time.split(':');
        

        // Format as "dd-mm-yyyy hh:mm AM/PM"
        const formattedDateTime = `${day}-${month}-${year} ${hour}:${minute} ${period}`;

        return formattedDateTime;
    }

    return (
        <userContext.Provider value={{ uid, name, profileImage, standards, userType, loginTheUser, logoutTheUser, rememberMe, setRememberMe, axiosSecure, timeLimit, setTimeLimit, isoToLocal }}>
            {children}
        </userContext.Provider>
    )
}

export default function useUser(){
    return useContext(userContext)
}