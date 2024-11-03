import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const userContext = createContext();

export function UserContextProvider({ children }) {

    const [userName, setUserName] = useState(null)
    const [profileImage, setProfileImage] = useState(null)

    // useEffect(() => {
    //     axios.get('https://randomuser.me/api/')
    //     .then(response => response.data.results[0])
    //     .then(data => {
    //         setUserName(data.name.first + ' ' + data.name.last)
    //         setProfileImage(data.picture.medium)
    //     })
    // }, [])

    return (
        <userContext.Provider value={{userName, setUserName, profileImage}}>
            {children}
        </userContext.Provider>
    )
}

export default function useUser(){
    return useContext(userContext)
}